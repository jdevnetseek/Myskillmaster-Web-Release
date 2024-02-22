import { Loader } from '@googlemaps/js-api-loader'
import ENV from '@/services/env'

const GoogleLoader = new Loader({
  apiKey: ENV.googlePlacesApiKey,
  libraries: ['places']
})

export default GoogleLoader
