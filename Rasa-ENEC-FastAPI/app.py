# Importing necessary libraries
import xmltodict
import uvicorn

from fastapi import FastAPI,File,UploadFile,Form
import pandas as pd
# from fastapi import jsonify

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request,Response
from fastapi.encoders import jsonable_encoder

from pymongo import MongoClient
import urllib
import numpy as np

import requests
import json
from flatten_json import flatten

from suds.client import Client
from suds.transport.https import HttpAuthenticated
from typing import Union

import re

import httpx

# importing datetime module
import datetime


from passlib.context import CryptContext


# username = 'KAAR'
# password = 'Qpmck@@r098'

# connection string for mongoDB

mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
client = MongoClient(mongodb_uri)


# Initializing the fast API server

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

#defining the model inputs

class User(BaseModel):
    prno : int
    pritemno : int
    WfRequestId:str


@app.get('/')
async def index():
    return {'message':'hello, world'}

@app.get('/welcome')
async def welcome():
    return {'message':'Welcome, Mate!'}



# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
class UserRegister(BaseModel):
    username: str
    # email: str
    password: str
    # location: str
    # role: str
    # key: str

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(user: UserRegister):

    db = client["ENEC_RasaChatbot"]
    collection = db["ENEC_Credentials"]

    # Check if user already exists
    if collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = pwd_context.hash(user.password)
    
    # Hash the password
    # Store user in database
    user_data = {
        "username": user.username,
        # "email": user.email,
        "password": hashed_password,
        # "location": user.location,
        # "role": user.role
    }
    collection.insert_one(user_data)


    return {"message": "User Registered Successfully"}

    # if (str(user.role) == "user" ):
    #     collection.insert_one(user_data)
    #     return {"message": "User registered successfully"}
    # elif (str(user.role) == "admin" and str(user.key) == "adminRAK"):
    #     collection.insert_one(user_data)
    #     return {"message": "Admin registered successfully"}
    # else:
    #     return {"message": "Action not permitted"}

@app.post("/login")
def login(user: UserLogin):
    print(user)

    db = client["ENEC_RasaChatbot"]
    collection = db["ENEC_Credentials"]

    # Find the user in the database
    db_user = collection.find_one({"username": user.username})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    # Verify the password
    if not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    username = db_user.get("username")
    email = db_user.get("email")
    location = db_user.get("location")
    role = db_user.get("role")
    response = {
        "username": username,
        "password": user.password

        # "email": email,
        # "location": location,
        # "userType": role

    }
    return {"message": "Login successful", "user": response}










































# @app.get('/qpmc_pending_pr')
# async def pending_pr():

#     url = 'http://hqs4hdm01.qpmc.qa:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_pr_pending_list?sap-client=200'

#     transport = HttpAuthenticated(username=username, password=password)
#     client = Client(url,transport=transport)
#     result = client.service.ZmmPrPendingListFm('ahamed')
#     listofobj = result[0]
#     pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

#     print(pendingpr)

#     return{'pending_pr': pendingpr}


# @app.get('/qpmc_pending_pr_items')
# async def pending_pr_items(prno:int):

#     url = f'http://172.16.195.52:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{prno}\')/to_PurchaseReqnItem?sap-client=200'
#     username = 'KAAR'
#     password = 'Qpmck@@r098'
#     # Create a session and set the authorization header
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)
#     itemlist=[]
#     i=0
#     flag = 0
#     while True:
#         try:
#             itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
#             i+=1
#             flag = 1
#         except:
#             if flag:
#                 break
#             else:
#                 itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
#                 break

#     print(itemlist)


#     return {"pr_item_list": itemlist}


# @app.get('/qpmc_pending_pr_item_description')
# async def qpmc_pending_pr_item_description(prno:int, pritemno:int):

#     url = f'http://172.16.195.52:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionItem(PurchaseRequisition=\'{prno}\',PurchaseRequisitionItem=\'{pritemno}\')?sap-client=200'
#     username = 'KAAR'
#     password = 'Qpmck@@r098'
#     # Create a session and set the authorization header
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)
#     desc = {}
#     desc['Purchase_Requisition_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
#     desc['Purchase_Requisition_Item_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
#     desc['Purchase_Requisition_Release_Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
#     desc['Purchase_Requisition_Item_Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
#     desc['Purchase_Requisition_Material_Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
#     desc['Requested_Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
#     desc['Base_Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
#     desc['Purchase_Requisition_Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
#     desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
#     desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
#     desc['Processing_Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
#     desc['Delivery_Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
#     desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']
    

#     pritemdesc = desc

#     for i in pritemdesc.keys():
#         if i == "Purchase_Requisition_Number":
#             PRnumber = pritemdesc[i]
#         elif i == "Purchase_Requisition_Item_Number":
#             PRItemNumber = pritemdesc[i]
#         elif i == "Purchase_Requisition_Release_Status":
#             PRItemStatus = pritemdesc[i]
#         elif i == "Purchase_Requisition_Item_Text":
#             PRItemText = pritemdesc[i]
#         elif i == "Purchase_Requisition_Material_Group":
#             PRMaterialGroup = pritemdesc[i]
#         elif i == "Requested_Quantity":
#             PRQuantity = pritemdesc[i]
#         elif i == "Base_Unit":
#             PRBaseUnit = pritemdesc[i]
#         elif i == "Purchase_Requisition_Price":
#             PRPrice = pritemdesc[i]
#         elif i == "Plant":
#             PRPlant = pritemdesc[i]
#         elif i == "Company_Code":
#             PRCompanyCode = pritemdesc[i]
#         elif i == "Processing_Status":
#             PRProcessingStatus = pritemdesc[i]
#         elif i == "Delivery_Date":
#             PRDeliveryDate = pritemdesc[i]
#         elif i == "Creation_Date":
#             PRCreationDate = pritemdesc[i]
    
#     if PRItemStatus == "01":
#         status = "Saved, not yet released"
#     elif PRItemStatus == "02":
#         status = "Released"
#     elif PRItemStatus == "03":
#         status = "Partially ordered"
#     elif PRItemStatus == "04":
#         status = "Completely ordered"
#     elif PRItemStatus == "05":
#         status = "Deleted"
#     elif PRItemStatus == "06":
#         status = "Manually set to Closed"
#     elif PRItemStatus == "07":
#         status = "Technically completed"
#     elif PRItemStatus == "08":
#         status = "Manually set to Locked"
#     elif PRItemStatus == "09":
#         status = "Sent"
#     elif PRItemStatus == "10":
#         status = "Partially invoiced"
#     elif PRItemStatus == "11":
#         status = "Completely invoiced"
#     elif PRItemStatus == "12":
#         status = "Manually set to Archived"
#     if PRProcessingStatus == "N":
#         Pstatus = "Not edited"
#     elif PRProcessingStatus == "B":
#         Pstatus = "PO created"
#     elif PRProcessingStatus == "A":
#         Pstatus = "RFQ created"
#     elif PRProcessingStatus == "K":
#         Pstatus = "Contract created"
#     elif PRProcessingStatus == "L":
#         Pstatus = "Scheduling aggrement created"
#     elif PRProcessingStatus == "S":
#         Pstatus = "Service entry sheet created"
#     elif PRProcessingStatus == "D":
#         Pstatus = "Deployment STR"
#     elif PRProcessingStatus == "E":
#         Pstatus = "RFQ sent to external system for sourcing"

#     new_line = "\n"
#     details = {
#             "Purchase Requisition Number": PRnumber,
#             "Purchase Requisition Item Number": PRItemNumber,
#             "Purchase_Requisition_Release_Status": f"{ PRItemStatus} - {status}",
#             "Purchase Requisition Item Text": PRItemText,
#             "Purchase_Requisition_Material_Group": PRMaterialGroup,
#             "Requested_Quantity": PRQuantity,
#             "Base_Unit": PRBaseUnit,
#             "Purchase_Requisition_Price": PRPrice,
#             "Plant": PRPlant,
#             "Company_Code": PRCompanyCode,
#             "Processing_Status": f"{PRProcessingStatus} - {Pstatus}",
#             "Creation_Date": PRCreationDate,
#             "Delivery_Date": PRDeliveryDate,
#         }


#     return { "item_desc" : details }



# @app.get('/qmpc_pending_pr_item_info')
# async def qmpc_pending_pr_item_info(prno:int):
#     url = f'http://172.16.195.52:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{prno}\')/to_PurchaseReqnItem?sap-client=200'
#     username = 'KAAR'
#     password = 'Qpmck@@r098'
#     # Create a session and set the authorization header
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)
#     itemlist=[]
#     i=0
#     flag = 0
#     while True:
#         try:
#             itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
#             i+=1
#             flag = 1
#         except:
#             if flag:
#                 break
#             else:
#                 itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
#                 break

#     items_list=[]

#     for i in itemlist:
#         a = i.split()[-1]
#         items_list.append(a)

#     item_list_description = {}

#     for i in items_list:
#         url = f'http://172.16.195.52:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionItem(PurchaseRequisition=\'{prno}\',PurchaseRequisitionItem=\'{i}\')?sap-client=200'
#         username = 'KAAR'
#         password = 'Qpmck@@r098'
#         # Create a session and set the authorization header
#         session = requests.Session()
#         session.auth = (username, password)
#         # Send a GET request to the SAP system
#         response = session.get(url)
#         # Print the response status code and content
#         obj = response.content
#         objstr = str(obj, 'UTF-8')
#         obj2 = xmltodict.parse(objstr)
#         js = json.dumps(obj2)
#         js_obj = json.loads(js)
#         flatjs = flatten(js_obj)
#         desc = {}
#         desc['Purchase Requisition Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
#         desc['Purchase Requisition Item Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
#         desc['Purchase Requisition Release Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
#         desc['Purchase Requisition Item Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
#         desc['Purchase Requisition Material Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
#         desc['Requested Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
#         desc['Base Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
#         desc['Purchase Requisition Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
#         desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
#         desc['Company Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
#         desc['Processing Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
#         desc['Delivery Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
#         desc['Creation Date'] = flatjs['entry_content_m:properties_d:CreationDate']
#         item_list_description["PR item "+ i] = desc
#     print(item_list_description)

#     return item_list_description


# @app.get('/qpmc_pending_pr_approval')
# async def qpmc_pending_pr_approval(prno:int):
#     print(prno) 
#     url = 'http://hqs4hdm01.qpmc.qa:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_pr_appr_rej?sap-client=200'
#     transport = HttpAuthenticated(username=username, password=password)
#     client_sap = Client(url,transport=transport)

#     text = ""

#     result = client_sap.service.ZmmPrApprRejFm('A',f'{prno}','ahamed')

#     Status_code = result["ExStatus"]

#     print(f"{Status_code}")

#     if Status_code == "ERROR":

#         text =f"PR {prno} is already approved/rejected" 


#     elif Status_code == "APPROVED":

#         db = client["QPMC_RasaChatbot"]
#         collection = db["Approved_PR"]
#         document = {"Purchase Requisition Number": "PR "+f"{prno}", "Status":"Approved"}
#         res = collection.insert_one(document)

#         text =f"PR {prno} is Approved successfully" 

    

#     return {"result" : result, "text":text}

# @app.get('/qpmc_pending_pr_reject')
# async def qpmc_pending_pr_reject(prno:int):

#     url = 'http://hqs4hdm01.qpmc.qa:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_pr_appr_rej?sap-client=200'
#     transport = HttpAuthenticated(username=username, password=password)
#     client_sap = Client(url,transport=transport)


#     result = client_sap.service.ZmmPrApprRejFm('R',f'{prno}','ahamed')

#     Status_code = result["ExStatus"]

#     print(f"{Status_code}")

#     text = ""

#     if Status_code == "ERROR":
#         text =f"PR {prno} is already approved/rejected" 

#     elif Status_code == "REJECTED":
            
#         db = client["QPMC_RasaChatbot"]
#         collection = db["Rejected_PR"]
#         document = {"Purchase Requisition Number": "PR "+f"{prno}", "Status":"Rejected"}
#         res = collection.insert_one(document)

#         text =f"PR {prno} is Rejected successfully"


#     return {"result":result, "text": text}


# @app.get('/qpmc_approved_pr_list_mongo')
# async def qpmc_approved_pr_list_mongo():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["Approved_PR"]
#     a=collection.find()

#     approved_pr_list = []

#     for i in a:
#         approved_pr_list.append(i['Purchase Requisition Number'])


#     return approved_pr_list


# @app.get('/qpmc_rejected_pr_list_mongo')
# async def qpmc_rejected_pr_list_mongo():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["Rejected_PR"]
#     a=collection.find()

#     rejected_pr_list=[]

#     for i in a:
#         rejected_pr_list.append(i['Purchase Requisition Number'])



#     return rejected_pr_list

# @app.get('/qpmc_leave_reuqest_sf')
# async def qpmc_leave_reuqest_sf():

#     username = 'kaaradmin@qatarprimaT1'
#     password = 'Qpmc@456'

#      # extranct date from the sentence
#     def extract_date_from_sentence(sentence):
#         pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
#         match = re.search(pattern, sentence)  # Search for the pattern in the sentence

#         if match:
#             date_within_parentheses = match.group(1)  # Extract the text within parentheses
#             return date_within_parentheses
#         else:
#             return None

#     # extracting words before paranthesis to find Leave Type
#     def words_before_parenthesis(sentence):
#         # Find the index of the opening parenthesis
#         parenthesis_index = sentence.find("(")

#         if parenthesis_index != -1:
#             words = sentence[:parenthesis_index][:-1]
#             return words
#         else:
#             return None

#     # picking up name from the sentece 
#     def pick_name_from_sentence(sentence):
#         colon_index = sentence.find(":")
        
#         if colon_index != -1:
#             words = sentence[colon_index+2:]
#             return words
#         else:
#             return None

#     url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)

#     pendingleave=[]
#     i=0 
#     while True:
#         try:
#             d={
#             'Leave Id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId'],
#             'Employee Name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName'])
#             }
#             pendingleave.append(d)
#             i+=1
#         except: 
#             break
  
#     print(pendingleave)


#     return pendingleave


# @app.get('/qpmc_accept_leave_reuqest_sf')
# async def qpmc_accept_leave_reuqest_sf(WfRequestId:str,name:str,type:str,duration:str):

#     # print(WfRequestId,name,type,duration)
#      # Set the SAP URL and credentials
#     url = f'https://api2preview.sapsf.eu/odata/v2/approveWfRequest?wfRequestId={WfRequestId}&comment=Approved'
#     username = 'kaaradmin@qatarprimaT1'
#     password = 'Qpmc@456'
#     # Create a session and set the authorization header
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.post(url)
#     # Print the response status code and content
#     print(response.status_code)
#     if response.status_code == 200:
#         db = client["QPMC_RasaChatbot"]
#         collection = db["Approved_Leave"]
#         document = {"Leave Id":f"{WfRequestId}","Employee Name":f"{name}","Leave Duration":f"{duration}","Leave Type":f"{type}", "Status":"Approved"}
#         res = collection.insert_one(document)

#     if response.status_code == 200:
#         res = f"Leave Request ({WfRequestId}) has been approved"
#     else:
#         res = f"Leave Request ({WfRequestId}) has been already approved and moved to higher level approver"

#     return res

# @app.get('/qmpc_reject_leave_request_sf')
# async def qpmc_reject_leave_request_sf(WfRequestId:str,name:str,type:str,duration:str):
#     print(WfRequestId,name,type,duration)
#     # Set the SAP URL and credentials
#     url = f'https://api2preview.sapsf.eu/odata/v2/rejectWfRequest?wfRequestId={WfRequestId}&comment=Rejected'
#     username = 'kaaradmin@qatarprimaT1'
#     password = 'Qpmc@456'
#     # Create a session and set the authorization header
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.post(url)
#     # Print the response status code and content
#     print(response)
#     if response.status_code == 200:
#         db = client["QPMC_RasaChatbot"]
#         collection = db["Rejected_Leave"]
#         document = {"Leave Id":f"{WfRequestId}" ,"Employee Name":f"{name}","Leave Duration":f"{duration}","Leave Type":f"{type}", "Status":"Rejected"}
#         res = collection.insert_one(document)

#     if response.status_code == 200:
#         res = f"Leave Request ({WfRequestId}) has been rejected"
#     else:
#         res = f"Leave Request ({WfRequestId}) has been already rejected"


#     return res


# @app.get('/qpmc_approved_leave_list_mongo')
# async def qpmc_approved_leave_list_mongo():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["Approved_Leave"]
#     a=collection.find()

#     approved_leave_list = []
#     approved_leave_dets= []

#     for i in a:
#         approved_leave_list.append(i['Leave Id'])
#         detail={}
#         detail["Leave Id"]=i['Leave Id']
#         detail["Employee Name"]=i['Employee Name']
#         detail["Leave Duration"]=i['Leave Duration']
#         detail["Leave Type"]=i['Leave Type']
#         approved_leave_dets.append(detail)
#     return {"approved_leave_list":approved_leave_list,"approved_leave_dets":approved_leave_dets}


# @app.get('/qpmc_rejected_leave_list_mongo')
# async def qpmc_rejected_leave_list_mongo():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["Rejected_Leave"]
#     a=collection.find()

#     rejected_leave_list=[]
#     rejected_leave_dets= []

#     for i in a:
#         rejected_leave_list.append(i['Leave Id'])
#         detail={}
#         detail["Leave Id"]=i['Leave Id']
#         detail["Employee Name"]=i['Employee Name']
#         detail["Leave Duration"]=i['Leave Duration']
#         detail["Leave Type"]=i['Leave Type']
#         rejected_leave_dets.append(detail)
#     return {"rejected_leave_list":rejected_leave_list,"rejected_leave_dets":rejected_leave_dets}


# @app.get('/qpmc_it_tickets')
# async def qpmc_it_tickets():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     a=collection.find()

#     it_tickets = []

#     for i in a:
#         print(i)
#         it_tickets.append(i['Ticket ID'])
#     return it_tickets

# @app.get('/qpmc_it_tickets_insert')
# async def qpmc_it_tickets_insert(tickettype:str,Hardwaretype:str,monitorsize : Union[str, None] = None):
#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     random_number = np.random.randint(10000, 100000)
#     ticket_number = "TCKT"+str(random_number)
#     print(ticket_number)
#     if(Hardwaretype == "Monitor"):
#         data = {
#             "Ticket ID": ticket_number,
#             "Ticket type": tickettype,
#             "Hardware type": Hardwaretype,
#             "Monitor Size": monitorsize
#         }
#     else:
#         data = {
#             "Ticket ID": ticket_number,
#             "Ticket type": tickettype,
#             "Hardware type": Hardwaretype
#         }
#     result = collection.insert_one(data)
#     if result.inserted_id:
#         print("ticket raised succesfully Inserted ID:", result.inserted_id)
#         res= f"Leave Request ({ticket_number}) has been inserted"
#     else:
#         res= f"Leave Request ({ticket_number}) has not been inserted"
#     return res

# @app.get('/qpmc_it_tickets_details')
# async def qpmc_it_tickets_details():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     a=collection.find()

#     it_ticket_detail = []

#     for i in a:
#         ticket={}
#         ticket["Ticket id"]=i['Ticket ID']
#         ticket["Ticket type"]=i['Ticket type']
#         ticket["Hardware type"]=i['Hardware type']
#         if(i['Hardware type']=="monitor" or i['Hardware type']=="Monitor" ):
#             ticket["Monitor Size"]=i['Monitor Size']
#         it_ticket_detail.append(ticket)
#     return it_ticket_detail




# @app.get('/qpmc_it_tickets_list')
# async def qpmc_it_tickets_list():

#     # a = "It ticket list working"
#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     a=collection.find()

    
#     ticket_list = []

#     for details in a:
#             ticket_list.append({
#                 "ticket_id":details["Ticket ID"],
#                 "ticket_type":details["Ticket type"],
#                 "hardware_type": details["Hardware type"],
#                 # "monitor_size": details["Monitor Size"]
#         })


#     return ticket_list

# @app.get('/qpmc_leave_req_accepted_list')
# async def qpmc_leave_req_accepted_list():
#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]
#     collection = db["Approved_Leave"]
#     a=collection.find()
#     approved_leave_list=[]
#     for i in a:
#         approved_leave_list.append({
#         "Leave_id": i["Leave Id"],
#         "Employee_Name": i["Employee Name"],
#         "Leave_Duration": i["Leave Duration"],
#         "Leave_Type": i["Leave Type"]
#         })
    
#     # print(approved_leave_list)


#     return approved_leave_list

# @app.get('/qpmc_leave_req_rejected_list')
# async def qpmc_leave_req_rejected_list():
#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]
#     collection = db["Rejected_Leave"]
#     a=collection.find()
#     rejected_leave_list=[]
#     for i in a:
#         rejected_leave_list.append({
#         "Leave_id": i["Leave Id"],
#         "Employee_Name": i["Employee Name"],
#         "Leave_Duration": i["Leave Duration"],
#         "Leave_Type": i["Leave Type"]
#         })
        
#     print(rejected_leave_list)


#     return rejected_leave_list


# # *********************************************** Dashboard api *********************************************************************

# @app.get('/Qpmc_IT_request_count')
# async def Qpmc_IT_request_count():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     a=collection.find()

#     ticket_count = 0

#     for details in a:
#             ticket_count += 1
#     # print(ticket_count)


#     return ticket_count

# @app.get('/qpmc_pending_pr_count')
# async def pending_pr_count():

#     url = 'http://hqs4hdm01.qpmc.qa:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_pr_pending_list?sap-client=200'

#     transport = HttpAuthenticated(username=username, password=password)
#     client = Client(url,transport=transport)
#     result = client.service.ZmmPrPendingListFm('ahamed')
#     listofobj = result[0]
#     pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

#     print(pendingpr)

#     pending_pr_list_count = len(pendingpr)

#     return pending_pr_list_count

# @app.get('/qpmc_leave_reuqest_sf_list_count')
# async def qpmc_leave_reuqest_sf_list_count():

#     username = 'kaaradmin@qatarprimaT1'
#     password = 'Qpmc@456'

#      # extranct date from the sentence
#     def extract_date_from_sentence(sentence):
#         pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
#         match = re.search(pattern, sentence)  # Search for the pattern in the sentence

#         if match:
#             date_within_parentheses = match.group(1)  # Extract the text within parentheses
#             return date_within_parentheses
#         else:
#             return None

#     # extracting words before paranthesis to find Leave Type
#     def words_before_parenthesis(sentence):
#         # Find the index of the opening parenthesis
#         parenthesis_index = sentence.find("(")

#         if parenthesis_index != -1:
#             words = sentence[:parenthesis_index][:-1]
#             return words
#         else:
#             return None

#     # picking up name from the sentece 
#     def pick_name_from_sentence(sentence):
#         colon_index = sentence.find(":")
        
#         if colon_index != -1:
#             words = sentence[colon_index+2:]
#             return words
#         else:
#             return None

#     url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)

#     pendingleave=[]
#     i=0 
#     while True:
#         try:
#             d={
#             'Leave Id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId'],
#             'Employee Name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName'])
#             }
#             pendingleave.append(d)
#             i+=1
#         except: 
#             break
  
#     print(pendingleave)

#     pendingleave_count = len(pendingleave)

#     print(pendingleave_count)

#     return pendingleave_count

# @app.get('/Qpmc_request_approved_count')
# async def Qpmc_request_approved_count():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["Approved_Leave"]
#     a=collection.find()

#     approved_count_sf = 0

#     for details in a:
#             approved_count_sf += 1
#     print(approved_count_sf)

#     collection = db["Approved_PR"]
#     a=collection.find()

#     approved_count_pr = 0

#     for details in a:
#             approved_count_pr += 1
#     print(approved_count_pr)

#     total_approved_request = approved_count_sf + approved_count_pr


#     return total_approved_request

# @app.get('/Qpmc_request_rejected_count')
# async def Qpmc_request_rejected_count():

#     db = client["QPMC_RasaChatbot"]
#     collection = db["Rejected_Leave"]
#     a=collection.find()

#     Rejected_count_sf = 0

#     for details in a:
#         Rejected_count_sf += 1
#     print(Rejected_count_sf)

#     collection = db["Rejected_PR"]
#     a=collection.find()

#     Rejected_count_pr = 0

#     for details in a:
#         Rejected_count_pr += 1
#     print(Rejected_count_pr)

#     total_Rejected_request = Rejected_count_sf + Rejected_count_pr


#     return total_Rejected_request



# @app.get('/total_pending_requests')
# async def total_pending_requests():

#     # Qpmc_IT_request_count - client call for finding total IT request

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/Qpmc_IT_request_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         Qpmc_IT_request_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

#     # qpmc_pending_pr_count - client call for finding total pr count

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/qpmc_pending_pr_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         qpmc_pending_pr_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

#     # qpmc_leave_reuqest_sf_list_count - client call for finding total sf leave req count

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/qpmc_leave_reuqest_sf_list_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         qpmc_leave_reuqest_sf_list_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

#     total_pending_requests = Qpmc_IT_request_count + qpmc_pending_pr_count + qpmc_leave_reuqest_sf_list_count
    

    
#     # # Qpmc_request_approved_count - client call for finding total approved count from mongo db

#     # async with httpx.AsyncClient() as client:
#     #     response = await client.get("http://localhost:8000/Qpmc_request_approved_count")  # Replace with the actual URL

#     # if response.status_code == 200:
#     #     Qpmc_request_approved_count = response.json()
        
    
#     # else:
#     #     return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

    
#     # # Qpmc_request_rejected_count - client call for finding total reject count form mongo db

#     # async with httpx.AsyncClient() as client:
#     #     response = await client.get("http://localhost:8000/Qpmc_request_rejected_count")  # Replace with the actual URL

#     # if response.status_code == 200:
#     #     Qpmc_request_rejected_count = response.json()
        
    
#     # else:
#     #     return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

    
    
#     return total_pending_requests


# @app.get('/overall_requests')
# async def overall_requests():

#     # Qpmc_IT_request_count - client call for finding total IT request

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/Qpmc_IT_request_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         Qpmc_IT_request_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

#     # qpmc_pending_pr_count - client call for finding total pr count

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/qpmc_pending_pr_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         qpmc_pending_pr_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

#     # qpmc_leave_reuqest_sf_list_count - client call for finding total sf leave req count

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/qpmc_leave_reuqest_sf_list_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         qpmc_leave_reuqest_sf_list_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

    
    

    
#     # Qpmc_request_approved_count - client call for finding total approved count from mongo db

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/Qpmc_request_approved_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         Qpmc_request_approved_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

    
#     # Qpmc_request_rejected_count - client call for finding total reject count form mongo db

#     async with httpx.AsyncClient() as client:
#         response = await client.get("http://localhost:8000/Qpmc_request_rejected_count")  # Replace with the actual URL

#     if response.status_code == 200:
#         Qpmc_request_rejected_count = response.json()
        
    
#     else:
#         return {"message": "Failed to call the Qpmc_IT_request_count endpoint"}
    

#     overall_requests = Qpmc_IT_request_count + qpmc_pending_pr_count + qpmc_leave_reuqest_sf_list_count + Qpmc_request_approved_count + Qpmc_request_rejected_count
    

    
    
#     return overall_requests


# # *****************************************************api for bar chart in dashboard*********************************************

# # Pending IT Request, Approved + Rejected IT Request


# @app.get('/It_request_bar_chart')
# async def It_request_bar_chart():

#     # a = "It ticket list working"
#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     a=collection.find()

    
#     ticket_count = 0

#     for details in a:
#             ticket_count += 1
#     # print(ticket_count)


#     return {"Pending IT Request": ticket_count,"approved_rejected_it_request_total": 5}



# @app.get('/PR_request_bar_chart')
# async def pr_request_bar_chart():

#     # pending pr count 

#     url = 'http://hqs4hdm01.qpmc.qa:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_pr_pending_list?sap-client=200'

#     transport = HttpAuthenticated(username=username, password=password)
#     client = Client(url,transport=transport)
#     result = client.service.ZmmPrPendingListFm('ahamed')
#     listofobj = result[0]
#     pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

#     # print(pendingpr)

#     pending_pr_list_count = len(pendingpr)

#     # ******************************************* approved and rejected pr list combined **************************************
#     # Approved pr list
     

#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]

#     collection = db["Approved_PR"]
#     a=collection.find()

#     approved_count_pr = 0

#     for details in a:
#             approved_count_pr += 1
#     print(approved_count_pr)

#     # rejected pr list 

#     db = client["QPMC_RasaChatbot"]

#     collection = db["Rejected_PR"]
#     a=collection.find()

#     rejected_count_pr = 0

#     for details in a:
#             rejected_count_pr += 1
#     print(rejected_count_pr)


#     total_pr_approved_and_rejected = approved_count_pr + rejected_count_pr




#     return {"Pending pr Request": pending_pr_list_count,"approved_rejected_pr_total": total_pr_approved_and_rejected}
    


# @app.get('/leave_request_bar_chart')
# async def leave_request_bar_chart():

#     # leave request count 

#     username = 'kaaradmin@qatarprimaT1'
#     password = 'Qpmc@456'

#      # extranct date from the sentence
#     def extract_date_from_sentence(sentence):
#         pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
#         match = re.search(pattern, sentence)  # Search for the pattern in the sentence

#         if match:
#             date_within_parentheses = match.group(1)  # Extract the text within parentheses
#             return date_within_parentheses
#         else:
#             return None

#     # extracting words before paranthesis to find Leave Type
#     def words_before_parenthesis(sentence):
#         # Find the index of the opening parenthesis
#         parenthesis_index = sentence.find("(")

#         if parenthesis_index != -1:
#             words = sentence[:parenthesis_index][:-1]
#             return words
#         else:
#             return None

#     # picking up name from the sentece 
#     def pick_name_from_sentence(sentence):
#         colon_index = sentence.find(":")
        
#         if colon_index != -1:
#             words = sentence[colon_index+2:]
#             return words
#         else:
#             return None

#     url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
#     session = requests.Session()
#     session.auth = (username, password)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)

#     pendingleave=[]
#     i=0 
#     while True:
#         try:
#             d={
#             'Leave Id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId'],
#             'Employee Name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName'])
#             }
#             pendingleave.append(d)
#             i+=1
#         except: 
#             break
  
#     print(pendingleave)

#     pending_leave_list_count = len(pendingleave)

#     # ******************************************* approved and rejected leave list combined **************************************
#     # Approved leave list
     

#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]

#     collection = db["Approved_Leave"]
#     a=collection.find()

#     approved_count_leave = 0

#     for details in a:
#             approved_count_leave += 1
#     # print(approved_leave_pr)

#     # rejected leave list 

#     db = client["QPMC_RasaChatbot"]

#     collection = db["Rejected_Leave"]
#     a=collection.find()

#     rejected_count_leave = 0

#     for details in a:
#             rejected_count_leave += 1
#     print(rejected_count_leave)


#     total_leave_approved_and_rejected = rejected_count_leave + approved_count_leave




#     return {"Pending leave Request": pending_leave_list_count,"approved_rejected_leave_total": total_leave_approved_and_rejected}


# @app.get('/latest_pending_request')
# async def latest_pending_request():

#     # latest pending pr request

#     url = 'http://hqs4hdm01.qpmc.qa:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_pr_pending_list?sap-client=200'

#     transport = HttpAuthenticated(username=username, password=password)
#     client = Client(url,transport=transport)
#     result = client.service.ZmmPrPendingListFm('ahamed')
#     listofobj = result[0]
#     pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

#     # print(pendingpr)

#     pendingpr = pendingpr[-2:]

    
#     resposne_list = []

#     date_increment_variable = 1

#     for i in pendingpr:

#         # input date
#         inputDate = '08-09-2023'

#         # giving the date format
#         date_format = '%d-%m-%Y'

#         # formatting the date using strptime() function and adding 1 day to it
#         date = datetime.datetime.strptime(inputDate, date_format) + datetime.timedelta(days=date_increment_variable)

#         # Formatting the date
#         date=date.strftime(date_format)

#         detail = {
#             "id" : i,
#             "Type" : "PR",
#             "requester_name" : "Ahmed",
#             "date" : date
#         }

#         date_increment_variable += 1
#         print(date_increment_variable)

        
#         resposne_list.append(detail)

#     # last 2 leave request from SF

#     username_sf = 'kaaradmin@qatarprimaT1'
#     password_sf = 'Qpmc@456'

#      # extranct date from the sentence
#     def extract_date_from_sentence(sentence):
#         pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
#         match = re.search(pattern, sentence)  # Search for the pattern in the sentence

#         if match:
#             date_within_parentheses = match.group(1)  # Extract the text within parentheses
#             return date_within_parentheses
#         else:
#             return None

#     # extracting words before paranthesis to find Leave Type
#     def words_before_parenthesis(sentence):
#         # Find the index of the opening parenthesis
#         parenthesis_index = sentence.find("(")

#         if parenthesis_index != -1:
#             words = sentence[:parenthesis_index][:-1]
#             return words
#         else:
#             return None

#     # picking up name from the sentece 
#     def pick_name_from_sentence(sentence):
#         colon_index = sentence.find(":")
        
#         if colon_index != -1:
#             words = sentence[colon_index+2:]
#             return words
#         else:
#             return None

#     url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
#     session = requests.Session()
#     session.auth = (username_sf, password_sf)
#     # Send a GET request to the SAP system
#     response = session.get(url)
#     # Print the response status code and content
#     obj = response.content
#     objstr = str(obj, 'UTF-8')
#     obj2 = xmltodict.parse(objstr)
#     js = json.dumps(obj2)
#     js_obj = json.loads(js)
#     flatjs = flatten(js_obj)

#     pendingleave=[]
#     i=0 

#     date_increment_variable = 1

#     while True:
#         # input date
#         inputDate = '01-09-2023'

#         # giving the date format
#         date_format = '%d-%m-%Y'

#         # formatting the date using strptime() function and adding 1 day to it
#         date = datetime.datetime.strptime(inputDate, date_format) + datetime.timedelta(days=date_increment_variable)

#         # Formatting the date
#         date=date.strftime(date_format)

        
#         try:
#             d={
#             'id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId'],
#             'requester_name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Leave Type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
#             'Type': "Leave",
#             'date': date
#             }
#             pendingleave.append(d)
#             i+=1

#             date_increment_variable += 1

#         except: 
#             break
  
#     print(pendingleave)

#     loop_vairable = 0

#     for i in pendingleave:
#         loop_vairable += 1
#         if (loop_vairable == len(pendingleave)) or (loop_vairable == len(pendingleave)-1):
#             resposne_list.append(i)
#             print(loop_vairable)
    
#     # it tickets last 2

#     mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
#     client = MongoClient(mongodb_uri)
#     db = client["QPMC_RasaChatbot"]
#     collection = db["ITTickets"]
#     a=collection.find()

#     it_tickets = []

#     for i in a:
#         print(i)
#         it_tickets.append(i['Ticket ID'])
    
#     print(it_tickets)

#     it_tickets = it_tickets[-2:]

#     date_increment_variable = 1

#     for i in it_tickets:
#         # input date
#         inputDate = '02-09-2023'

#         # giving the date format
#         date_format = '%d-%m-%Y'

#         # formatting the date using strptime() function and adding 1 day to it
#         date = datetime.datetime.strptime(inputDate, date_format) + datetime.timedelta(days=date_increment_variable)

#         # Formatting the date
#         date=date.strftime(date_format)
#         detail = {
#             "id": i,
#             "Type" : "IT Ticket",
#             "Requester_name": "Ahmed",
#             "date" : date
#         }

#         date_increment_variable += 1

#         resposne_list.append(detail)





#     return resposne_list



if __name__ == '__main__':
    uvicorn.run(app,port=8000, log_level="info")