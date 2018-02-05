# Rei

Code diplay online, it uses [CodeMirror](https://codemirror.net/) to the editor.

## Install
```bash
  $ git clone https://github.com/Aztic/Rei && cd Rei
  $ npm install
  $ vim /routes/index.js #replace the BASE_URL const
  $ npm start
```



## Usage

You can either go to `localhost:3000` (or your configured url) or use it with cURL like
`curl -d "extension" --data-binary "@file" url`

For example:
```bash
  $ curl -d "cpp" --data-binary "@test.cpp" http://localhost:3000/
```
that will return the url of the file, something like
`https://le_url/random_name.cpp`

You can also see the content of the file using cUrl.
```bash
  $ curl http://localhost:3000/file.cpp
```
will return the content of the file, for example

```bash
  $ curl http://localhost:3000/file.cpp
  $ #include <iostream>
    
    int main(){
      return 0;
    }

  $ something_else
```


## LICENSE

  Apache 2.0
