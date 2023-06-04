// import {API_BASE_URL} from "../api-config";
import { useRecoilValue } from "recoil";
import { tokenState } from "../components/TokenAtom";

function Call(api, method, request) {
    const tokenValue = useRecoilValue(tokenState);
    
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: api,
        method: method,
    };
    if(request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then((response) => {
        if(response.status === 200) {
            return response.json();
        } else {
            new Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}
export default Call;