import sys

def main(request, response):
    """
    Simple handler that sets a response header based on which client hint
    request headers were received.
    """

    response.headers.append(b"Content-Type", b"text/html; charset=UTF-8")
    response.headers.append(b"Access-Control-Allow-Origin", b"*")
    response.headers.append(b"Access-Control-Allow-Headers", b"*")
    response.headers.append(b"Access-Control-Expose-Headers", b"*")

    response.headers.append(b"Accept-CH", b"device-memory")
    response.headers.append(b"Critical-CH", b"device-memory")

    response.headers.append(b"Cache-Control", b"no-store")

    token = request.GET.first(b"token", None)

    with request.server.stash.lock:
      count = request.server.stash.take(token)
      if(count == None):
        count = 1
      else:
        count += 1
      request.server.stash.put(token, count)
      response.content = str(count)
