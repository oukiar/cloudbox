
#parse stuff
from parse_rest.connection import register, ParseBatcher
from parse_rest.datatypes import Object
from parse_rest.user import User

import time

#parse initialization
register("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "PE8FNw0hDdlvcHYYgxEnbUyxPkP9TAsPqKvdB4L0")
     
ClientsTest = Object.factory("Clients")

pc = ClientsTest.Query.get(objectId="mCcWlsoRUh")

'''
if pc.Telephone[0] == chr(10):
    print "SI"


pc.Telephone = pc.Telephone.splitlines()[0]

print len(pc.Telephone)

for character in pc.Telephone:
    print pc.Telephone.index(character)
    print character.encode('hex')

exit()
'''

n = 100
counter = 0

clients = []

while n == 100:
    print "Fetching: " + str(counter)
    res = ClientsTest.Query.all().skip(counter)

    cc = 0
    batchclients = []

    for i in res:
        clients.append(i)
        batchclients.append(i)
        
        accountID =  "A" + str(counter+cc).zfill(4)
        
        print accountID
        
        i.AccountID = accountID
        
        print "-- " + i.Name
        print "-- " + i.Telephone
        
        try:
            i.Telephone = i.Telephone.splitlines()[0]
        except:
            i.Telephone = ""
        
            
        try:
            i.Email = i.Email.splitlines()[0]
        except:
            i.Email = ""
            
        cc += 1
            
        i.save()
        
        '''
        if len(batchclients) == 10:
            batcher = ParseBatcher()
            batcher.batch_save(res)
            
            batchclients = []
        '''
    n = len(res)
    counter += n


print len(clients)
