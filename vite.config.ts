import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
	target: `https://www.learnwithjason.dev`,
	changeOrigin: true,
	configure(proxy, options) {
	  let original = proxy.web;
	  proxy.web = function(req, res) {
	    setTimeout(() => {
	      original.call(proxy, req, res);
	    }, 2000);
	  }
	  //	  console.log(proxy.proxyRequest.toString(), options);
	},
      },      
    }
  }
})
