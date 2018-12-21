

export const loadAllTrailers = () => {
    let responses = fetch("http://192.168.10.204:8080/trailers")
      .then((response) => response.json())
      .then((responseJson) => {

        // this.setState({
        //   allTrailers: responseJson,
        // });
        return responseJson;
      })
      .catch((error) =>{
        console.error(error);
      });
      console.log(responses);
      
    return responses;
}