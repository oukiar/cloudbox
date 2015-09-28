
#parse stuff
from parse_rest.connection import register, ParseBatcher
from parse_rest.datatypes import Object
from parse_rest.user import User

import time

#parse initialization
register("XEPryFHrd5Tztu45du5Z3kpqxDsweaP1Q0lt8JOb", "PE8FNw0hDdlvcHYYgxEnbUyxPkP9TAsPqKvdB4L0")
     
Agencies = Object.factory("Agencies")
     

lines = open("stores.csv").readlines()

agencieslist = []

counter = 0

for line in lines:
    print lines.index(line)
    agency = Agencies()
    
    try:
        name, email, company, country = line.split(",")
    except:
        name = line.split('"')[0]
        print line
        fooname, email, company, country, morefoo = line[len(name)+2:].split(",")
        
    agency.Name = name
    agency.Email = email
    agency.Company = {"__type": "Pointer", "className": "Companies", "objectId": "ATTeW8GRQt"}
    agency.Key = company
    agency.Country = country
    #client.save()
    
    agencieslist.append(agency)
    
    print email
    
    counter += 1
    
    if(counter == 20):
    
        batcher = ParseBatcher()
        batcher.batch_save(agencieslist)
        agencieslist = []

        print "Esperando algunos segundos"

        #esperar un poco
        time.sleep(.1)
        
        counter=0
        
        print "Trabajando ..."
    
print str(len(lines)) + " lines analized"
