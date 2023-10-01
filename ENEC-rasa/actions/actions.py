# This files contains your custom actions which can be used to run
# custom Python code.

# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from datetime import date

import datetime as dt
import json
from typing import Any, Text, Dict, List

from pymongo import MongoClient


import numpy as np

mongodb_uri = (
    "mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test"
)
client = MongoClient(mongodb_uri)


from actions.api import Leave_Request_SF,Accept_leave_req_SF,Reject_leave_req_SF,Leave_Request_SF_Details, pending_pr_list, pending_po_list, pending_prlist_ENEC,pending_pr_item_description_ENEC,pending_polist_ENEC, pending_po_item_description_ENEC,PoApprovalENEC,PrApprovalENEC


from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionTest(Action):

    def name(self) -> Text:
        return "action_to_test"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="action is working fine")

        return []
    
class GreetAction(Action):

    def name(self) -> Text:
        return "greet_action"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hi, How can I help you!")

        return []
    

class GoodbyeAction(Action):

    def name(self) -> Text:
        return "goodbye_action"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="bye!")

        return []





# ************************************ Policy action    *********************************************************
class ActionCompanyPolicy(Action):
    def name(self) -> Text:
        return "action_company_policy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        policies = [
            {
                "link": "https://drive.google.com/file/d/1WN8JCQQcwLI8aQQu7SAKNbRTmhJT1MU9/view?usp=sharing",
                "tag": "Corporate attire",
            },
            {
                "link": "https://drive.google.com/file/d/1a3wu2-svZpK4i9OuPOk0lfX2L51OxF5B/view?usp=sharing",
                "tag": "Over-time",
            },
            {
                "link": "https://drive.google.com/file/d/1JQgNNogtb0iQNJJdNmfQoCz8HpFG3y0t/view?usp=sharing",
                "tag": "Leave",
            },
            {
                "link": "https://drive.google.com/file/d/1QlgqqKBTYCzuzOQkj9aK5yrICrNc7OCB/view?usp=sharing",
                "tag": "Probation",
            },
            {
                "link": "https://drive.google.com/file/d/1AFfH7RyDgT_W_vlJXmQSd2mkBdJ6HcMZ/view?usp=sharing",
                "tag": "Travel",
            },
            {
                "link": "https://drive.google.com/file/d/1ne15AM8qRSok5jgXzprmLlyi4Sc9uVvW/view?usp=sharing",
                "tag": "Additional billing hours",
            },
            {
                "link": "https://drive.google.com/file/d/1NwFYLsfGN5iY98O2ZYaiidvJWfQhqlzl/view?usp=sharing",
                "tag": "Expense management system",
            },
            {
                "link": "https://drive.google.com/file/d/1ebnCwddMrSVWMgaokKcXbZu8vckbN21O/view?usp=sharing",
                "tag": "Kaar FTF Bucket",
            },
            {
                "link": "https://drive.google.com/file/d/1rENdrPATmdhZDNRi8aE34IeiGME4Yi2d/view?usp=sharing",
                "tag": "KICC",
            },
            {
                "link": "https://drive.google.com/file/d/1RzYf-ULkVdHyfNQ7zVRZwmS_jXNRqtos/view?usp=sharing",
                "tag": "Reimbursement",
            },
            {
                "link": "https://drive.google.com/file/d/1ez3Ty0p6sotBWw8F-tI5AdoQ7WVAFOXe/view?usp=sharing",
                "tag": "Interview panel",
            },
            {
                "link": "https://drive.google.com/file/d/14h4ehEaKBb01lMs9c1bwWEc3Qjbc42xU/view?usp=sharing",
                "tag": "WFH",
            },
            {
                "link": "https://drive.google.com/file/d/1dPxZ0xyZ0QgoqqQII1hv83-nemWHjZcL/view?usp=sharing",
                "tag": "Appraisal",
            },
            {
                "link": "https://drive.google.com/file/d/1U_ZBnpyB8EyGyTdVSMe5EXNxqJ7wwyJz/view?usp=sharing",
                "tag": "Certification",
            },
            {
                "link": "https://drive.google.com/file/d/1gTvG4ZxM8_1XvWDJzQkKQcxtWcZa3tmM/view?usp=sharing",
                "tag": "Deputation",
            },
            {
                "link": "https://drive.google.com/file/d/1Q7k0dlaGeE4RwuDJmhou8lC1Fz420aZ4/view?usp=sharing",
                "tag": "Training",
            },
            {
                "link": "https://drive.google.com/file/d/1DW_z38VuTN6S7Ya5wsHJmAtVpLw-aYaY/view?usp=sharing",
                "tag": "Working hours",
            },
            {
                "link": "https://drive.google.com/file/d/1KO_G-prADGnMkscnV-62O_bStdcoDYus/view?usp=sharing",
                "tag": "Employee soft loan",
            },
            {
                "link": "https://drive.google.com/file/d/1-vQz5YBS0xY6hISkpMTftgoPOELZOSW1/view?usp=sharing",
                "tag": "Laptop damage",
            },
            {
                "link": "https://drive.google.com/file/d/1KMnDOqCXWXspe4OfbU_y0geCoKmMBOn0/view?usp=sharing",
                "tag": "Odd hour commute",
            },
            {
                "link": "https://drive.google.com/file/d/1doYTivXYOEmGczK3crRuXnQgWeEJjRsk/view?usp=sharing",
                "tag": "Performance appraisal",
            },
            {
                "link": "https://drive.google.com/file/d/1ZqeKmlI1zvQT7vU7vJhJIPn13ClhTVtb/view?usp=sharing",
                "tag": "R and R",
            },
            {
                "link": "https://drive.google.com/file/d/1PLZoBPuZ3rCmbmcGzATk8GzKvamgaE8W/view?usp=sharing",
                "tag": "Timesheet",
            },
            {
                "link": "https://drive.google.com/file/d/1Sd71gERYEpsDXr07daN3C2Q4IlfKOjJ7/view?usp=sharing",
                "tag": "Remote working",
            },
        ]

        send = {"links": policies, "msg": "The Company Policies are.."}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

# ************************************ Policy action    ********************************************************

# ************************************ individual Policy action  ********************************************************


class ActionCorporateAttirePolicy(Action):
    def name(self) -> Text:
        return "action_corporateattirepol"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Corporate Attire Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Corporate%20Attire%20Policy.pdf?csf=1&web=1&e=nhNR98",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionOvertimePolicy(Action):
    def name(self) -> Text:
        return "action_over-timepol"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Overtime Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionLeavePolicy(Action):
    def name(self) -> Text:
        return "action_leavepol"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Leave Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Overtime%20Policy.pdf?csf=1&web=1&e=gy7927",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionProbationPolicy(Action):
    def name(self) -> Text:
        return "action_probationpol"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Probation Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Leave%20Policy%20-%20India.pdf?csf=1&web=1&e=h6mBdS, Others- https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Leave%20Policy.pdf?csf=1&web=1&e=hres42",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionTravelPolicy(Action):
    def name(self) -> Text:
        return "action_travelpol"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Travel Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Travel%20Policy.pdf?csf=1&web=1&e=ia4gK9",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class Actionaddlbillinghourspolicies(Action):
    def name(self) -> Text:
        return "action_addlbillinghrspol"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Additional Billing Hours Policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Additional%20Billing%20Hours%20Policy%20-%20UK%202.0.pdf?csf=1&web=1&e=i373nJ",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionexpensemgmtsystemPolicy(Action):
    def name(self) -> Text:
        return "action_expensemgmtsystem"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Expense management system policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Expenses%20Management%20System%20Policy.pdf?csf=1&web=1&e=Hwue5A",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionFTFBucketsPolicy(Action):
    def name(self) -> Text:
        return "action_ftfbucketspolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "tag": "Kaar FTF Bucket policy",
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20FTF%20Buckets%20Policy.pdf?csf=1&web=1&e=BYTeTJ",
                }
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionInternalComplaintsCommitteePolicy(Action):
    def name(self) -> Text:
        return "action_InternalComplaintsCommitteePolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Internal%20Complaints%20Committee%20Policy.pdf?csf=1&web=1&e=mGiNwo",
                    "tag": "KICC policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionReimbursementsPolicy(Action):
    def name(self) -> Text:
        return "action_ReimbursementsPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Reimbursement%20Policy%20.pdf?csf=1&web=1&e=5N5YJu",
                    "tag": "Reimbursement policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []


class ActionInterviewPanelPolicy(Action):
    def name(self) -> Text:
        return "action_InterviewPanelPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Kaar%20Virtual%20Interview%20Panel%20Policy.pdf?csf=1&web=1&e=ecDx6s",
                    "tag": "Interview panel policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionWFHPolicy(Action):
    def name(self) -> Text:
        return "action_WFHPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20%20-%20WFH%20Policy.pdf?csf=1&web=1&e=s9jfRN",
                    "tag": "WFH policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionAppraisalPolicy(Action):
    def name(self) -> Text:
        return "action_AppraisalPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Appraisal%20Policy.pdf?csf=1&web=1&e=qzEmnc",
                    "tag": "Appraisal policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionCertificationPolicy(Action):
    def name(self) -> Text:
        return "action_CertificationPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Certification%20Policy.pdf?csf=1&web=1&e=nqvkXE",
                    "tag": "Certification policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionDeputationPolicy(Action):
    def name(self) -> Text:
        return "action_DeputationPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Deputation%20Policy.pdf?csf=1&web=1&e=jleXgV",
                    "tag": "Deputation policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionTrainingPolicy(Action):
    def name(self) -> Text:
        return "action_TrainingPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Training%20Policy.pdf?csf=1&web=1&e=BwcyK9",
                    "tag": "Training policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionWorkingHoursPolicy(Action):
    def name(self) -> Text:
        return "action_WorkingHoursPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20-%20Working%20Hours%20Policy.pdf?csf=1&web=1&e=U3hSrn",
                    "tag": "Working hours policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionEmployeeSoftLoanPolicy(Action):
    def name(self) -> Text:
        return "action_EmployeeSoftLoanPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20Employee%20Soft%20Loan%20Policy.pdf?csf=1&web=1&e=3OpGGF",
                    "tag": "Employee soft loan policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionLaptopDamagePolicy(Action):
    def name(self) -> Text:
        return "action_LaptopDamagePolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/KaarTech%20Laptop%20Damage%20Policy.pdf?csf=1&web=1&e=uujQca",
                    "tag": "Laptop damage policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionOddHourCommutePolicy(Action):
    def name(self) -> Text:
        return "action_OddHourCommutePolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Odd%20Hour%20Commute%20Policy.pdf?csf=1&web=1&e=dyTnnA",
                    "tag": "Odd hour commute policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionPerformanceAppraisalPolicy(Action):
    def name(self) -> Text:
        return "action_PerformanceAppraisalPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Performance%20Appraisal%20Policy%202.0.pdf?csf=1&web=1&e=26GAVq",
                    "tag": "Performance appraisal policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionRewardsandRecognitionPolicy(Action):
    def name(self) -> Text:
        return "action_RewardsandRecognitionPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/R%20%26%20R%20Policy.pdf?csf=1&web=1&e=vZbdDu",
                    "tag": "Rewards and Recognition policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionTimesheetPolicy(Action):
    def name(self) -> Text:
        return "action_TimesheetPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Timesheet%202.0%20Policy.pdf?csf=1&web=1&e=sGAPY3",
                    "tag": "Timesheet policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


class ActionRemoteworkingPolicy(Action):
    def name(self) -> Text:
        return "action_RemoteworkingPolicy"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        send = {
            "links": [
                {
                    "link": "https://kaartechit-my.sharepoint.com/:b:/r/personal/damudhesh_kaartech_com/Documents/Documents/Kaar_policies/POLICIES/Remote%20WorX%20Policy.pdf?csf=1&web=1&e=aemqla",
                    "tag": "Remote working policy",
                },
            ]
        }
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        return []


# ************************************ individual Policy action  ********************************************************




# ******************************************** ENEC ticket raising ********************************************************************************************

class ENECTicketRaiseMonitor(Action):

    def name(self) -> Text:
        return "ENEC_ticket_raise_monitor_action"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        db = client["ENEC_RasaChatbot"]
        collection = db["ITTickets"]
        
        
        ticket_type = tracker.get_slot("ticket_type")

        hardware_type = tracker.get_slot("hardware_type")

        ticket_type_nlu = ["hardware","hrdware","hrdwre","hrdwr","hware"]

        monitor_type_nlu = ["monitor","moni","mntr","moniter","monitr","mntor"]

        
        if ticket_type in ticket_type_nlu:
            ticket_type = "hardware"
        
        if hardware_type in monitor_type_nlu:
            hardware_type = "monitor"
        
        
        monitor_inches = tracker.get_slot("monitor_inches")

        random_number = np.random.randint(10000, 100000)
        ticket_number = "TCKT"+str(random_number)
        print(ticket_number)

        print(date.today())

        ticket_date = date.today()


        # Dictionary to be inserted
        data = {
            "Ticket ID": ticket_number,
            "Ticket type": "hardware",
            "Hardware type": hardware_type,
            "Monitor Size": monitor_inches,
            "date": f"{ticket_date}"

        }

        # Insert the dictionary into the collection
        result = collection.insert_one(data)

        if result.inserted_id:
            print("ticket raised succesfully Inserted ID:", result.inserted_id)
        else:
            print("Failed to insert ticket to mongo")


        dispatcher.utter_message(text=f"Your ticket has been raised with Ticket ID: {ticket_number} \nTicket type:{ticket_type} \nHardware type:{hardware_type} \nInches:{monitor_inches}")

        return []
    
class ENECTicketRaise(Action):

    def name(self) -> Text:
        return "ENEC_ticket_raise_action"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            
        
        db = client["ENEC_RasaChatbot"]
        collection = db["ITTickets"]
        
        
        ticket_type = tracker.get_slot("ticket_type")
        
        hardware_type = tracker.get_slot("hardware_type")

        ticket_type_nlu = ["hardware","hrdware","hrdwre","hrdwr","hware"]

        keyboard_type_nlu = ["keyboard","keybaord","kbrd","keybord","keybrd","kybrd"]

        mouse_type_nlu = ["muse","muose","mse","mose","mouse"]

        printer_type_nlu = ["printer","prntr","print","pntr","printor","prentor"]

        scanner_type_nlu = ["scanner","scnr","scan","scaner","scanar","scanr"]


        if hardware_type in keyboard_type_nlu:
            hardware_type = "keyboard"
        
        elif hardware_type in mouse_type_nlu:
            hardware_type = "mouse"
        
        elif hardware_type in printer_type_nlu:
            hardware_type = "printer"

        elif hardware_type in scanner_type_nlu:
            hardware_type = "scanner"
        

        if ticket_type in ticket_type_nlu:
            ticket_type = "hardware"


        random_number = np.random.randint(10000, 100000)
        ticket_number = "TCKT"+str(random_number)
        print(ticket_number)

        ticket_date = date.today()

        # Dictionary to be inserted
        data = {
            "Ticket ID": ticket_number,
            "Ticket type": "hardware",
            "Hardware type": hardware_type,
            "date": f"{ticket_date}"
        }

        # Insert the dictionary into the collection
        result = collection.insert_one(data)

        if result.inserted_id:
            print("ticket raised succesfully Inserted ID:", result.inserted_id)
        else:
            print("Failed to insert ticket to mongo")


        dispatcher.utter_message(text=f"Your ticket has been raised with Ticket ID: {ticket_number} \nTicket type:{ticket_type} \nHardware type:{hardware_type} \n")


        return []

# ******************************************** ENEC ticket raising ********************************************************************************************
