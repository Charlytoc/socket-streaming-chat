const API_URL = "https://rigobot.herokuapp.com"


export const startConversation = async (purpose_id: string | number, token: string) => {
    const conversationUrl = API_URL + "/v1/conversation/?purpose=" + purpose_id
  
    const config = {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      }
    }
  
    const resp = await fetch(conversationUrl, config);
    const data = await resp.json();
    return data
  }