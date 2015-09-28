
#parse stuff
from parse_rest.connection import register, ParseBatcher
from parse_rest.datatypes import Object
from parse_rest.user import User

import time

#parse initialization
register("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "PE8FNw0hDdlvcHYYgxEnbUyxPkP9TAsPqKvdB4L0")
     
Agencies = Object.factory("Agencies")
     
#print Agencies.Query.all()


storeslist = []

counter = 0
total = 0

q = Agencies.Query.all()

print q[0]

q = Agencies.Query.skip(100)
#q.skip(100)

print q[0]

exit()


for agency in Agencies.Query.all():
    
    print agency.Company.objectId
    
    agency.Company = {"__type": "Pointer", "className": "Companies", "objectId": "ATTeW8GRQt"}

    storeslist.append(agency)

    counter += 1
    
    if(counter == 20):
        total += 20
        batcher = ParseBatcher()
        batcher.batch_save(storeslist)
        storeslist = []

        print "Esperando algunos segundos"

        #esperar un poco
        time.sleep(.1)
        
        counter=0
        
        print "Trabajando ..."

print "Total: ", total
