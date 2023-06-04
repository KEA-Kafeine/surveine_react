from flask import *
import openai
import os

openai.api_key = os.environ["OPENAI_API_KEY"]

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

survey_list = ["이해도 조사 (교육용)", "사원들 대상의 설문 (기업용)", "인적사항 조사", "후기, 리뷰 및 만족도 조사", "시험지 및 퀴즈 제작", "본인확인 설문"]

@app.route('/api/template', methods=['POST', 'GET', 'OPTIONS'])
def recommend_template():
    if request.method == 'OPTIONS':
        resp = jsonify({"msg": "hello world"})
        resp.headers.add('Access-Control-Allow-Credentials', 'true')
        resp.headers.add('Content-Type', 'application/json')
        return resp
    
    
    if request.method == 'POST':
        data = request.get_json()
        userText = data['prompt']
        suggested_survey = generate_survey(userText, survey_list)
        # print(f"추천하는 설문지는 {suggested_survey}입니다.")

        resp = {
            "isSuccess": True,
            "result": {
                "prompt": userText,
                "recommend": suggested_survey
            }
        }
        return jsonify(resp)

def generate_survey(prompt, survey_list):
    prompt = str(survey_list) + "중에서, " + prompt + "와 유사한건 뭘까? 단답형으로 대답해줘"

    gpt_resp = openai.Completion.create(model="text-davinci-003", prompt=prompt, max_tokens=50, n=1, stop=None, temperature=0)
    recommend = gpt_resp.choices[0].text.lstrip()
    
    return recommend


if __name__ == '__main__':
    app.run(debug=True, port=8080) 