## script   XMLHttpRequest   instance

```
    let request = new XMLHttpRequest();
    let url = // set url instance
    request.open('get',url);
    request.send(null)

    //按需使用
    request.response(ArrayBuffer,Blob,Document,DOMString)
```