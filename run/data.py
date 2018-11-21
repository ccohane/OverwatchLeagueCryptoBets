import requests, json, pprint


data = "https://api.overwatchleague.com/stats/matches/10279/maps/4"
data2= "https://api.overwatchleague.com/schedule"
data3= "https://api.overwatchleague.com/stats/players"

response = json.loads(requests.get(data2).text)

#pprint.pprint([x for x in response["data"]["stages"][0]])   ["winner"]["name"]
#pprint.pprint(response["data"]["stages"][1]["matches"][61])
print("stage 1 winner")
pprint.pprint(response["data"]["stages"][1]["matches"][61]["winner"]['id'])
pprint.pprint(response["data"]["stages"][1]["matches"][61]["winner"]['name'])
pprint.pprint(response["data"]["stages"][1]["matches"][61]["competitors"][0]['id'])
pprint.pprint(response["data"]["stages"][1]["matches"][61]["competitors"][0]['abbreviatedName'])
pprint.pprint(response["data"]["stages"][1]["matches"][61]["competitors"][1]['id'])
pprint.pprint(response["data"]["stages"][1]["matches"][61]["competitors"][1]['abbreviatedName'])
print()
print("stage 2 winner")
pprint.pprint(response["data"]["stages"][2]["matches"][61]["winner"]['id'])
pprint.pprint(response["data"]["stages"][2]["matches"][61]["winner"]['name'])
pprint.pprint(response["data"]["stages"][2]["matches"][61]["competitors"][0]['id'])
pprint.pprint(response["data"]["stages"][2]["matches"][61]["competitors"][0]['abbreviatedName'])
pprint.pprint(response["data"]["stages"][2]["matches"][61]["competitors"][1]['id'])
pprint.pprint(response["data"]["stages"][2]["matches"][61]["competitors"][1]['abbreviatedName'])

print()
print("stage 4 winner")
pprint.pprint(response["data"]["stages"][4]["matches"][62]["winner"]['id'])
pprint.pprint(response["data"]["stages"][4]["matches"][62]["winner"]['name'])
pprint.pprint(response["data"]["stages"][4]["matches"][62]["competitors"][0]['id'])
pprint.pprint(response["data"]["stages"][4]["matches"][62]["competitors"][0]['abbreviatedName'])
pprint.pprint(response["data"]["stages"][4]["matches"][62]["competitors"][1]['id'])
pprint.pprint(response["data"]["stages"][4]["matches"][62]["competitors"][1]['abbreviatedName'])
print()
print("stage 3 winner")
pprint.pprint(response["data"]["stages"][3]["matches"][62]["winner"]['id'])
pprint.pprint(response["data"]["stages"][3]["matches"][62]["winner"]['name'])
pprint.pprint(response["data"]["stages"][3]["matches"][62]["competitors"][0]['id'])
pprint.pprint(response["data"]["stages"][3]["matches"][62]["competitors"][0]['abbreviatedName'])
pprint.pprint(response["data"]["stages"][3]["matches"][62]["competitors"][1]['id'])
pprint.pprint(response["data"]["stages"][3]["matches"][62]["competitors"][1]['abbreviatedName'])
print()
print("stage 5 winner")
pprint.pprint(response["data"]["stages"][5]["matches"][11]["winner"]['id'])
pprint.pprint(response["data"]["stages"][5]["matches"][11]["winner"]['name'])
pprint.pprint(response["data"]["stages"][5]["matches"][11]["competitors"][0]['id'])
pprint.pprint(response["data"]["stages"][5]["matches"][11]["competitors"][0]['abbreviatedName'])
pprint.pprint(response["data"]["stages"][5]["matches"][11]["competitors"][1]['id'])
pprint.pprint(response["data"]["stages"][5]["matches"][11]["competitors"][1]['abbreviatedName'])


def get_player_data():
    data="https://api.overwatchleague.com/stats/players"
    response = json.loads(requests.get(data).text)
    print(response['data'])

def get_match_ids():
    data="https://api.overwatchleague.com/schedule"
    response = json.loads(requests.get(data).text)
    li=[]
    for x in range(len(response["data"]['stages'])):
        for y in range(len(response["data"]['stages'][x]["matches"])):
            li.append(response["data"]['stages'][x]["matches"][y]['id'])
    #print(li)
'''
    for x in li:
        for y in range(1,6):
            try:
                data="https://api.overwatchleague.com/stats/matches/{}/maps/{}".format(x,y)
                response = json.loads(requests.get(data).text)
            except: 
                break
                '''

def get_stage1_ids():
    data="https://api.overwatchleague.com/schedule"
    response = json.loads(requests.get(data).text)
    #print(response["data"]['stages'][1]["matches"])

get_stage1_ids()