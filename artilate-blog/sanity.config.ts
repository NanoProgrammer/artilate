import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'artilate-blog',

  projectId: '6iiz87f6',
  dataset: 'production',
  basePath: '/',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
   cors: {
    credentials: true,
    origin: [
      'http://localhost:3333',
      'https://artilate-blog.netlify.app',
      // Agrega cualquier otro dominio que necesites
    ]
  },
  api: {
    projectId: '6iiz87f6',
    dataset: 'production'
  }
})
