"""Servidor HTTP simple con fallback a index.html para SPA (React Router)"""
import http.server
import os

PORT = 4173
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'app', 'dist')


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Si es un archivo estático que existe, servirlo
        path = os.path.join(ROOT, self.path.lstrip('/'))
        if os.path.isfile(path):
            return super().do_GET()
        # Si es directorio, servir index
        if os.path.isdir(path) and os.path.exists(os.path.join(path, 'index.html')):
            self.path = os.path.join(self.path, 'index.html')
            return super().do_GET()
        # Fallback a index.html (SPA)
        self.path = '/index.html'
        return super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # silenciar logs


os.chdir(ROOT)
httpd = http.server.HTTPServer(('127.0.0.1', PORT), SPAHandler)
print(f'Servidor SPA en http://127.0.0.1:{PORT}/')
print(f'Root: {ROOT}')
httpd.serve_forever()
