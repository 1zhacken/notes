import backend
import webbrowser as wb
from threading import Thread

if __name__=="__main__":
    print ('[!] Starting server')
    server = Thread(target=backend.app.run, daemon=True).start()
    print('[+] Now you can connect to 127.0.0.1:5000')
    print('[!] Trying to start web-interface automaticaly')
    print(
        wb.open('http://127.0.0.1:5000') 
        and '[+] Success'
        or  '[!] Something wrong')
    
    while True:
        try:
            pass
        except KeyboardInterrupt:
            break