from flask import *
from flask_cors import CORS




app = Flask(__name__)
CORS(app,supports_credentials=True)
app.config['JSON_AS_ASCII'] = False

@app.route('/recommend/template', methods=['POST', 'GET', 'OPTIONS'])
def recTemplate():
    if request.method == 'OPTIONS':
        resp = jsonify({"msg": "hello world"})
        resp.headers.add('Access-Control-Allow-Credentials', 'true')
        resp.headers.add('Content-Type', 'application/json')
        return resp

    if request.method == 'GET':
        keyword = request.args.get('keyword')
        template_list = ["이해도 조사 (교육용)", "사원들 대상의 설문 (기업용)", "인적사항 조사", "후기 및 만족도 조사", "시험지 및 퀴즈 제작", "본인확인 설문"]
        #prompt = "다음 질문을 단답형으로 알려줘. 설문조사 템플릿에는 " + str(template_list) + "이 있어. 이 중 " + keyword + "는 어떤 템플릿에 해당할까?"
        
        resp = {
            "isSuccess": True,
            "message": "테스트용",
            "result": {
                "keyword": keyword,
               # "gpt_prompt": prompt,
                "recommend": template_list[3]
            }
        }
        return resp

if __name__ == '__main__':
    app.run(debug=True, port=8080)