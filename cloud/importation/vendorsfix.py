
#parse stuff
from parse_rest.connection import register, ParseBatcher
from parse_rest.datatypes import Object
from parse_rest.user import User

import time

#parse initialization
register("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "PE8FNw0hDdlvcHYYgxEnbUyxPkP9TAsPqKvdB4L0")
     
Agencies = Object.factory("Agencies")


n = 100
counter = 0

clients = []

while n == 100:
    print "Fetching: " + str(counter)
    res = Agencies.Query.all().skip(counter)

    cc = 0
    batchclients = []

    for i in res:
        clients.append(i)
        batchclients.append(i)
        
        accountID =  "AV" + str(counter+cc).zfill(4)
        
        print accountID
        
        i.AccountID = accountID
        
        print "-- " + i.Name
        
        try:
            print "-- " + i.Telephone
            i.Telephone = i.Telephone.splitlines()[0]
        except:
            if hasattr(i, "Telephone"):
                i.Telephone = ""
        
            
        try:
            i.Email = i.Email.splitlines()[0]
        except:
            if hasattr(i, "Email"):
                i.Email = ""
            
        cc += 1
            
        #i.save()
        
        
        if len(batchclients) == 50:
            batcher = ParseBatcher()
            batcher.batch_save(batchclients)
            
            batchclients = []
        
    n = len(res)
    counter += n


print len(clients)
