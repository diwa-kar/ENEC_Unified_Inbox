import requests
import xmltodict
import json
from flatten_json import flatten

from suds.client import Client
from suds.transport.https import HttpAuthenticated

import re

from pymongo import MongoClient
import urllib


mongodb_uri = (
    "mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test"
)
client = MongoClient(mongodb_uri)


username = 'Girish'
password = 'Kaar@12345'


# *********************************************** pending pr from digiverz local system *********************************************

def pending_pr_list(user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_pending?sap-client=100'

    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)
    result = client.service.ZfmPrPending(user_name) 
    listofobj = result[0]
    pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

    print(username,"inside function")

    print(pendingpr)


    return pendingpr


# *********************************************** pending pr from digiverz local system *********************************************

# *********************************************** pending po from digiverz local system ***************************************************

def pending_po_list(user_name:str):

    url = "http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_pending?sap-client=100" 

    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)
    result = client.service.ZfmPoPending(user_name) 
    listofobj = result[0]
    pendingpo = ['PO '+str(i.Ebeln) for i in listofobj]

    print(pendingpo)

    return pendingpo


# *********************************************** pending po from digiverz local system ****************************************************








# ************************************************* pr item list from Digiverz demo system *****************************************************************


def pending_prlist_ENEC(prno):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{prno}\')/to_PurchaseReqnItem"


    username = 'Girish'
    password = 'Kaar@12345'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
                break
    print(itemlist)

    return itemlist


# ************************************************* pr item list from Digiverz demo system *****************************************************************


# *********************************************** pr item details from digiverz demo system ***************************************************

def pending_pr_item_description_ENEC(prno,pritemno):

    url = f'http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/C_PURREQUISITION_FS_SRV/I_Purchaserequisitionitem(PurchaseRequisition=\'{prno}\',PurchaseRequisitionItem=\'{pritemno}\')'

    username = 'Girish'
    password = 'Kaar@12345'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    desc = {}
    desc['Purchase_Requisition_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
    desc['Purchase_Requisition_Item_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
    desc['Purchase_Requisition_Release_Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
    desc['Purchase_Requisition_Item_Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
    desc['Purchase_Requisition_Material_Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
    desc['Requested_Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
    desc['Base_Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
    desc['Purchase_Requisition_Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
    desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
    desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
    desc['Processing_Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
    desc['Delivery_Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
    desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']
    # item_list_description["PR item "+ i] = desc
    
    print(desc)


    return desc


# *********************************************** pr item details from digiverz demo system ***************************************************



# ************************************************* pr item list from Digiverz demo system *****************************************************************


def pending_polist_ENEC(pono):

    
    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder(\'{pono}\')/to_PurchaseOrderItem"

    username = 'Girish'
    password = 'Kaar@12345'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PO Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseOrderItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PO Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseOrderItem']}")
                break
    print(itemlist)

    return itemlist


# ************************************************* pr item list from Digiverz demo system *****************************************************************



# *********************************************** pending po item details from digiverz demo system **************************************************

def pending_po_item_description_ENEC(pono,poitemno):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder=\'{pono}\',PurchaseOrderItem=\'{poitemno}\')/to_PurchaseOrder"


    username = 'Girish'
    password = 'Kaar@12345'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    
    desc = {}
    desc['Purchase_Order_Number'] = flatjs['entry_content_m:properties_d:PurchaseOrder']
    desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
    desc['Created_By_User'] = flatjs['entry_content_m:properties_d:CreatedByUser']
    desc['Purchasing_Processing_Status'] = flatjs['entry_content_m:properties_d:PurchasingProcessingStatus']
    desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']
    desc['Supplier'] = flatjs['entry_content_m:properties_d:Supplier']
    desc['Purchase_Order_Subtype'] = flatjs['entry_content_m:properties_d:PurchaseOrderSubtype']
    desc['Payment_Terms'] = flatjs['entry_content_m:properties_d:PaymentTerms']
    desc['Purchasing_Group'] = flatjs['entry_content_m:properties_d:PurchasingGroup']
    desc['Address_City_Name'] = flatjs['entry_content_m:properties_d:AddressCityName']
    desc['Address_Postal_Code'] = flatjs['entry_content_m:properties_d:AddressPostalCode']
    desc['Address_Street_Name'] = flatjs['entry_content_m:properties_d:AddressStreetName']
    desc['Address_Country'] = flatjs['entry_content_m:properties_d:AddressCountry']
    desc['Address_Region'] = flatjs['entry_content_m:properties_d:AddressRegion']
    
    print(desc)


    return desc

# *********************************************** pending po item details from digiverz demo system **************************************************

# ********************************************* pending po approval on digiverz demo system **************************************************

def PoApprovalENEC(pono:str,comment:str, user_name:str):

    # comment = "Approved by Girish"
    
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_acceptreject?sap-client=100 '
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZmmPoApprRejFm('A',f'{comment}',f'{pono}',user_name)

    # addiing comment with result
    result["Comment"] = comment

    print(result)

    return result


# ********************************************* pending po approval on digiverz demo system **************************************************

# ********************************************** Po reject on digi demo system ****************************************************************


def Po_Rejection_ENEC(pono:str,comment:str, user_name:str):

    # comment = "Approved by Girish"
    
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_acceptreject?sap-client=100 '
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZmmPoApprRejFm('R',f'{comment}',f'{pono}',user_name)

    # addiing comment with result
    result["Comment"] = comment

    print(result)

    return result





# ********************************************** Po reject on digi demo system ****************************************************************





# ********************************************* pending pr approval on digiverz demo system **************************************************

def PrApprovalENEC(prno:str,comment:str,user_name:str):

    # comment = "Approved by ABAPER1"
    
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_acceptreject?sap-client=100'
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZmmPrApprRejFm('A',f'{comment}',f'{prno}',user_name)
    
    result["Comment"] = comment

    print(result)

    return result

# ********************************************* pending pr approval on digiverz demo system **************************************************

# ********************************************* pending pr rejection on digiverz demo system **************************************************

def Pr_Rejection_ENEC(prno:str,comment:str,user_name:str):

    # comment = "Approved by ABAPER1"
    
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_acceptreject?sap-client=100'
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZmmPrApprRejFm('R',f'{comment}',f'{prno}',user_name)
    
    result["Comment"] = comment

    print(result)

    return result

# ********************************************* pending pr rejection on digiverz demo system **************************************************









# ****************************************** fetching pending leave request form SF ******************************************

def Leave_Request_SF():

    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'

    # extranct date from the sentence
    def extract_date_from_sentence(sentence):
        pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
        match = re.search(pattern, sentence)  # Search for the pattern in the sentence

        if match:
            date_within_parentheses = match.group(1)  # Extract the text within parentheses
            return date_within_parentheses
        else:
            return None

    # extracting words before paranthesis to find Leave Type
    def words_before_parenthesis(sentence):
        # Find the index of the opening parenthesis
        parenthesis_index = sentence.find("(")

        if parenthesis_index != -1:
            words = sentence[:parenthesis_index][:-1]
            return words
        else:
            return None

    # picking up name from the sentece 
    def pick_name_from_sentence(sentence):
        colon_index = sentence.find(":")
        
        if colon_index != -1:
            words = sentence[colon_index+2:]
            return words
        else:
            return None

    url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)

    pendingleave=[]
    leave_id_list=[]
    i=0 
    while True:
        try:
            d={
            'subject_id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId']+"L",
            'subject_name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
            'leave_duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
            'leave_type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName'])
            
            
            }
            leave_id_list.append("PL "+flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId']+"L")
            pendingleave.append(d)
            i+=1
        except: 
            break
  
    print(leave_id_list)


    return leave_id_list

# ****************************************** fetching pending leave request form SF ******************************************

# ****************************************** fetching pending leave request Details ******************************************
def Leave_Request_SF_Details(WfRequestId):

    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'

    # extranct date from the sentence
    def extract_date_from_sentence(sentence):
        pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
        match = re.search(pattern, sentence)  # Search for the pattern in the sentence

        if match:
            date_within_parentheses = match.group(1)  # Extract the text within parentheses
            return date_within_parentheses
        else:
            return None

    # extracting words before paranthesis to find Leave Type
    def words_before_parenthesis(sentence):
        # Find the index of the opening parenthesis
        parenthesis_index = sentence.find("(")

        if parenthesis_index != -1:
            words = sentence[:parenthesis_index][:-1]
            return words
        else:
            return None

    # picking up name from the sentece 
    def pick_name_from_sentence(sentence):
        colon_index = sentence.find(":")
        
        if colon_index != -1:
            words = sentence[colon_index+2:]
            return words
        else:
            return None

    url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)

    pendingleave={}
    i=0 
    while True:
        try:
            d={
            'Leave Id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId']+"L",
            'Employee Name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
            'Leave Duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
            'Leave Type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName'])
            }
            pendingleave[d['Leave Id']]=d
            i+=1
        except: 
            break
    
    print(pendingleave)
  
    return pendingleave[f'{WfRequestId}']


# ****************************************** fetching pending leave request Details ******************************************


# ****************************************** accepting pending leave from SF *****************************************************

def Accept_leave_req_SF(WfRequestId):
    

    db = client["QPMC_RasaChatbot"]
    collection = db["Approved_Leave"]
    
    data = Leave_Request_SF_Details(WfRequestId)

    # Set the SAP URL and credentials
    url = f'https://api2preview.sapsf.eu/odata/v2/approveWfRequest?wfRequestId={WfRequestId}&comment=Approved'
    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.post(url)
    # Print the response status code and content
    print(response.status_code)



    if response.status_code == 200:
        res = f"Leave Request ({WfRequestId}) has been approved"
        data['Status'] = "Approved"

        print(data)

        result = collection.insert_one(data)
        print("Leave request approved successfully", result.inserted_id)
    else:
        res = f"Leave Request ({WfRequestId}) has been already approved and moved to higher level approver"

    return res




# ****************************************** accepting pending leave from SF *****************************************************

# ****************************************** reject leave from SF ****************************************************

def Reject_leave_req_SF(WfRequestId):

    db = client["QPMC_RasaChatbot"]
    collection = db["Rejected_Leave"]
    
    data = Leave_Request_SF_Details(WfRequestId)
    
    # Set the SAP URL and credentials
    url = f'https://api2preview.sapsf.eu/odata/v2/rejectWfRequest?wfRequestId={WfRequestId}&comment=Rejected'
    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.post(url)
    # Print the response status code and content
    print(response)

    if response.status_code == 200:
        res = f"Leave Request ({WfRequestId}) has been rejected"
        data['Status'] = "Rejected"

        print(data)
        
        result = collection.insert_one(data)
        print("Leave request rejected:", result.inserted_id)

    else:
        res = f"Leave Request ({WfRequestId}) has been already rejected"


    return res


# ****************************************** reject leave from SF ****************************************************



# **************************************** pending invoice list from local digiverz ************************************8


def pending_invoice_list(user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_pending_web?sap-client=100'

    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)
    result = client.service.ZFM_INV_PENDING(user_name) 
    listofobj = result[0]
    pendinginvoice_list = ['IN '+str(i.INVOICE) for i in listofobj]

    return pendinginvoice_list



# **************************************** pending invoice list from local digiverz ************************************



# ****************************************** pending invoice info from local digiverz **********************************

def Invoice_info(inv_no:str):
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_detail_web?sap-client=100'

    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)
    result = client.service.ZBAPI_MM_INV_GET_DETAIL(inv_no) 
    data = result[2]

    # print(data)

    invoice_info = {}

    invoice_info["Invocie_no"] = data["INV_DOC_NO"]
    invoice_info["Fiscal_Year"] = data["FISC_YEAR"]
    invoice_info["Document_Type"] = data["DOC_TYPE"]
    invoice_info["Document_Date"] = data["DOC_DATE"]
    invoice_info["Posting_Date"] = data["PSTNG_DATE"]
    invoice_info["user_name"] = data["USERNAME"]
    invoice_info["Reference_Document_No"] = data["REF_DOC_NO"]
    invoice_info["Company_Code"] = data["COMP_CODE"]
    invoice_info["Currency"] = data["CURRENCY"]
    invoice_info["Gross_amount"] = data["GROSS_AMNT"]

    return invoice_info


# ****************************************** pending invoice info from local digiverz **********************************


# *********************************************** approved pending invoice on digi demo system**************************************************

def INVOCIEApproval(invoice_no:str,comment:str,user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_apprej_web?sap-client=100'
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZFM_INV_APPROVAL('A',f'{comment}',f'{invoice_no}',user_name)

    result["Comment"] = comment

    print(result)

    return result

# *********************************************** approved pending invoice on digi demo system**************************************************




# *********************************************** reject pending invoice on digi demo system**************************************************

def Rejection_ENEC_Invoice(invoice_no:str,comment:str,user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_apprej_web?sap-client=100'
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZFM_INV_APPROVAL('R',f'{comment}',f'{invoice_no}',user_name)

    result["Comment"] = comment

    print(result)

    return result

# *********************************************** reject pending invoice on digi demo system**************************************************


# ************************************************ pending ses list from digi demo system ****************************************************

def pending_ses_list(user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_ses_pending?sap-client=100'

    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)
    result = client.service.ZMM_SES_PENDING_FM(user_name)

    listofobj = result[0]
    # print(type(listofobj))


    pending_ses_list = []


    for i in listofobj:
        
        pending_ses_list.append("SES " + str(i['ENTRYSHEET']))
        pending_ses_list = pending_ses_list[:21]

    print(pending_ses_list)
    
    return pending_ses_list


# ************************************************ pending ses list from digi demo system ****************************************************

# *********************************************** pending ses details from digi demo system **************************************************

def SES_info(ses_no:set):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_ses_get_detail_time?sap-client=100'

    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)
    result = client.service.ZMM_SES_GET_DETAIL_FM(ses_no) 
    # print(result)
    # print(result[0])

    data = result[0]

    SES_DETAILS = {}

    SES_DETAILS["SHEET_NO"] =  data["SHEET_NO"]
    SES_DETAILS["CREATED_BY"] = data["CREATED_BY"]
    SES_DETAILS["CREATED_ON"] = data["CREATED_ON"]
    SES_DETAILS["CURRENCY"] = data["CURRENCY"]
    SES_DETAILS["PO_NUMBER"] = data["PO_NUMBER"]
    SES_DETAILS["PO_ITEM"] = data["PO_ITEM"]
    SES_DETAILS["SHORT_TEXT"] = data["SHORT_TEXT"]
    SES_DETAILS["PCKG_NO"] = data["PCKG_NO"]
    SES_DETAILS["NET_VALUE"] = data["NET_VALUE"]


    return SES_DETAILS


# *********************************************** pending ses details from digi demo system **************************************************

# *********************************************** SES Appproval ******************************************************************************

def SES_Approval(ses_no:str,comment:str,user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_apporreject_bapi?sap-client=100'
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)


    result = client.service.ZMM_SES_APPROVE_FM('R',f'{comment}',f'{ses_no}',user_name)

    result["Comment"] = comment

    print(result)

    print(result["EX_STATUS"])


    return result

# *********************************************** SES Appproval ******************************************************************************


# *********************************************** SES Rejection ******************************************************************************

def SES_Rejection(ses_no:str,comment:str,user_name:str):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_apporreject_bapi?sap-client=100'
    transport = HttpAuthenticated(username=username, password=password)
    client = Client(url,transport=transport)

    result = client.service.ZMM_SES_APPROVE_FM('R',f'{comment}',f'{ses_no}',user_name)

    result["Comment"] = comment

    print(result)

    print(result["EX_STATUS"])

    return result


# *********************************************** SES Rejection ******************************************************************************
