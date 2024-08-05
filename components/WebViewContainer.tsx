import { useRef } from 'react';
import { View, Text, type TextProps, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';


export function WebViewContainer({ url, id, sharedCookiesEnabled, setAemCookies, aemCookies }: any) {

  const webViewRef = useRef(null);

  const customHTML = `
  <body style="display:flex; flex-direction: column;justify-content: center; 
    align-items:center; background-color: black; color:white; height: 100%;">
      <h1 style="font-size:100px; padding: 50px; text-align: center;" 
      id="h1_element">
        This is simple html
      </h1>
      <h2 style="display: block; font-size:80px; padding: 50px; 
      text-align: center;" id="h2_element">
        This text will be changed later!
      </h2>
   </body>`;
   const runFirst = `
      setTimeout(function() { 
          window.alert("Click me!");
          document.getElementById("h1_element").innerHTML = 
          "What is your favourite language?";
          document.getElementById("h2_element").innerHTML =
          "We will see!";
        }, 1000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const runBeforeFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
      `;
      // document.cookie=${aemCookies || {}}
  const getCookiesJS = `
  ReactNativeWebView.postMessage(document.cookie});
  `;
  const clearAllCookiesJs = () => {
    console.log(`clearing all cookies`)
    return `
    ReactNativeWebView.postMessage(''});
  `
  };
  // document.addEventListener(`message`, {

  // })
  // ReactNativeWebView.postMessage(${aemCookies ? aemCookies : 'document.cookie'});
  const setCookiesJs = () => {
    if(aemCookies) {
      return aemCookies;
    } else {
      return {};
    }
  }
  const onMessage = (event: any) => {
    // alert(`onMessage`);
    console.log(`event.nativeEvent.data: `, event.nativeEvent.data)
    onCookieReceived(event.nativeEvent.data)
  }
  const onCookieReceived = (data: any) => {
    console.log(`Received Cookies: for id: ${id} `, data);
    if(data.includes(`dtCookie=`)){
      console.log(`=====A Valid Cookie=====`)
      setAemCookies(data);
      console.log(`Setted Cookies: `)
    } else if(data.includes(`clear:true`)) {
      console.log(`Clearing cookies`)
      setAemCookies(null);
    } else {
      console.log(`====> Invalid Cookie, Ignoring`)
    }
  }
  const getCookie = (name: string) => {
    const value = `${aemCookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        {`Selected ID: ${id} & Selected URL: ${url}`}
      </Text>
      <Text>
        {/* {`Current aemCookies: ${aemCookies}`} */}
        {
          `rxVisitor: ${getCookie('rxVisitor')}`
        }
      </Text>
      <Text>
        {`expires: ${getCookie('expires')}`}
      </Text>
        {
          <WebView 
            sharedCookiesEnabled={sharedCookiesEnabled}
            ref={webViewRef}
            originWhitelist={['*']}
            onMessage={(event) => {
              console.log(`event: `,event.nativeEvent.data)
              onMessage(event)
            }}
            source={{ 
              uri: url,
              // headers: aemCookies || {}
            }}
            // injectedJavaScript={aemCookies ? setCookiesJs(): getCookiesJS}
            domStorageEnabled
            // injectedJavaScript={getCookiesJS}
            // injectedJavaScript={id === 5 ? clearAllCookiesJs() : getCookiesJS}
            injectedJavaScript={id === 5 ? `
                document.cookie='';
                window.ReactNativeWebView.postMessage('clear:true');
              ` : (
              aemCookies ? (`
                document.cookie=${aemCookies};
                `) : (`
                  (function(){
                    window.ReactNativeWebView.postMessage(document.cookie);
                  })()
                `)
            )}
            javaScriptEnabled={true}
            injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
          />
        }
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
