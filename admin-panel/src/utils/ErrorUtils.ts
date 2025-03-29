class ErrorUtils {
    static extractError(e: any) {
      if(typeof e === "string") {
          return e
      }
      if(typeof e === "object") {
          if(e.message) {
              return e.message
          }        
      }
      return "Error"
    }
  }
  
  export default ErrorUtils
  