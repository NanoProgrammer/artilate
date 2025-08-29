// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Configuración del cliente Sanity con valores hardcodeados
export const sanityClient = createClient({
  projectId: '6iiz87f6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Cambiar a false para desarrollo
  ignoreBrowserTokenWarning: true
})

// Builder para URLs de imágenes
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function getOptimizedImageUrl(
  source: SanityImageSource,
  width: number = 800,
  height: number = 600,
  quality: number = 90
): string {
  return urlFor(source)
    .width(width)
    .height(height)
    .quality(quality)
    .auto('format')
    .url()
}

// Tipos TypeScript
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImage {
  asset: { _ref?: string; url?: string }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  current: string
  _type: 'slug'
}

// Helper functions con logging mejorado
export async function fetchSanityData<T = any>(
  query: string, 
  params: Record<string, any> = {}
): Promise<T | null> {
  try {
    console.log('🔍 Ejecutando query:', query)
    console.log('📋 Parámetros:', params)
    
    const data = await sanityClient.fetch<T>(query, params)
    
    console.log('✅ Datos obtenidos:', Array.isArray(data) ? `${data.length} elementos` : 'objeto individual')
    console.log('📄 Datos:', data)
    
    return data
  } catch (error) {
    console.error('❌ Error al obtener datos de Sanity:', error)
    return null
  }
}

// Queries actualizadas para usar SOLO 'post'
export const queries = {
  // Todos los posts
  allPosts: `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> { 
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    _updatedAt,
    author-> {
      name,
      bio,
      image { 
        asset-> { url },
        alt
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    tags[]-> {
      _id,
      title,
      slug
    },
    estimatedReadingTime,
    featured
  }`,

  // Post por slug
  postBySlug: `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))] [0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage {
      asset-> { 
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    _updatedAt,
    author-> {
      name,
      bio,
      image { 
        asset-> { url },
        alt
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    tags[]-> {
      _id,
      title,
      slug
    },
    estimatedReadingTime,
    featured
  }`,

  // Solo slugs para static paths
  allSlugs: `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{ slug }`,

  // Categorías
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    "count": count(*[_type == "post" && references(^._id) && !(_id in path("drafts.**"))])
  }`
}

// Funciones helper simplificadas
export async function getAllPosts(limit?: number) {
  const query = limit 
    ? `${queries.allPosts} [0...${limit}]`
    : queries.allPosts
  
  const result = await fetchSanityData(query)
  return result || []
}

export async function getPostBySlug(slug: string) {
  return await fetchSanityData(queries.postBySlug, { slug })
}

export async function getAllSlugs() {
  return await fetchSanityData(queries.allSlugs) || []
}

export async function getFeaturedPosts(limit: number = 2) {
  const featuredQuery = `*[_type == "post" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> { url },
      alt,
      hotspot
    },
    publishedAt,
    author-> {
      name,
      image { asset-> { url } }
    },
    categories[]-> {
      title,
      slug
    },
    estimatedReadingTime
  }`
  
  return await fetchSanityData(featuredQuery) || []
}

export async function getAllCategories() {
  return await fetchSanityData(queries.allCategories) || []
}