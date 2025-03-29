import ErrorUtils from "./../utils/ErrorUtils";

class ApiServices {
    constructor() {

    }


    async genericResponseHandler(res) {
        if(res.status === 200) {
            const respText = await res.text()
            const respData = respText ? JSON.parse(respText) : null
            // const errorJson = respData?.errors?.[0]

            // if (errorJson) {
            //     if (errorJson?.errorDescription) throw new Error(respData.errors[0].errorDescription)
            //     else throw new Error("Error submitting")
            // }

            return {
                data: respData,
                headers: res.headers,
                status: res.status,
                errorMessage: ""
            }
        } else {           
            throw new Error(res.status.toString())                        
        }
    }

    genericErrorHandler(e) {
        throw ErrorUtils.extractError(e)
    }

    // For all post api requests
    async post(url, payload) {
        try {
            const res = await fetch(new Request(url, { ...this.requestObject, method: 'POST', body: payload ? JSON.stringify(payload) : undefined }))
            return await this.genericResponseHandler(res)
        } catch (e) {
            this.genericErrorHandler(e)
        }
    }
}

const ApiService = new ApiServices()
export default ApiService