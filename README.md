# Like-Hooks

React Hooks Library,Support React@16.8↑;

![npm](https://img.shields.io/npm/v/like-hooks)
![npm](https://img.shields.io/npm/dm/like-hooks)
![NPM](https://img.shields.io/npm/l/like-hooks)
![language](https://img.shields.io/badge/language-javascript-orange.svg)

## Usage

``` js
import { useRaf } from 'like-hooks'
```

## install

``` shell
npm i like-hooks -S
```

or

``` shell
yarn add like-hooks save
```

## useDeepMemo

Can receive an object for depth comparison,like useMemo.

``` js
 const [opacity, setOpacity] = useState({
   opacity:1,
   hasChange: false
 })
 return useMemo(() => (
    <FormItem
      label="Opacity"
    >
      <Slider
        stepSize={0.01}
        labelStepSize={0.2}
        onChange={setOpacity}
        value={opacity}
      />
    </FormItem>
  ), [opacity]);
```

## useDeepCallback

like useDeepMemo,But this belongs to `useDeepCallback`.

```js
const [times, setTimes] = useState({
   count:1,
   hasChange:false
 })
const cb = useDeepCallback(()=> setTimes(pre=> pre.count++),[times])

```

## useDeepEffect

Depth contrast deps,trigger effects.

```js
const [times, setTimes] = useState({
   count:1,
   hasChange:false
 })
useDeepEffect(()=> {
  console.log(times.count) // only run once
},[times])

```

## useWhyDidYouUpdate

Version of hook `WhyDidYouUpdate`。

``` js
function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  // Our console output tells use that the style prop for <Counter> ...
  // ... changes on every render, even when we only change userId state by ...
  // ... clicking the "switch user" button. Oh of course! That's because the
  // ... counterStyle object is being re-created on every render.
  // Thanks to our hook we figured this out and realized we should probably ...
  // ... move this object outside of the component body.
  const counterStyle = {
    fontSize: '3rem',
    color: 'red'
  };

  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}
```

## useStateWithCb

Support for setstate callbacks, just like class Component

``` js
const [count, setCounter] = useStateWithCb('');
setCounter(
  pre => pre + 'Hello',
  (first, firstSetter) => {
    console.log(first);
  }
);
// or Continuous trigger
setCounter(
  pre => pre + " World",
  (first, firstSetter) => {
    console.log(first);
    firstSetter(
      pre => pre + " !",
      (second, secondSetter) => {
        console.log(second);
      }
    );
  }
);
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=StateCb&module=%2Fsrc%2Fviews%2FStateCb.js)

## useStateChange

when state has changed the callback function will be triggered in useEffect。

``` js
const [state, setState] = useStateChange('', (newestState) => {
  // when state changed do something before second render
})
```

## useStateChangeLayout

Similar to the hook function above, however function will be triggered in useLayoutEffect。

``` js
const [state, setState] = useStateChange('',(newestState) => {
  // when state changed do something after first render
})
```

## useLockBodyScroll

In some cases, user scrolling is disable。

``` js
useLockBodyScroll();
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useLockBodyScroll&module=%2Fsrc%2Fviews%2FUseLockBodyScroll.js)

## useContextProvide

``` js
import {useContextProvide} from 'like-hooks'
useContextProvide(contextKet:string,reducer:(<T>state:any,action:object):any<T>,initialState?:any,initAction?:any):<State,Dispatch>[]
```

## useDebounce

useDebounce(debounceFn:()=>any,deps:any[],times:number)

```js
const [val, setVal] = useState(0);
const [debouncedValue, setDebouncedValue] = useState("");

useDebounce(
  () => {
    setDebouncedValue(val);
  },
  [val],500
);
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useDebounce&module=%2Fsrc%2Fviews%2FUseDebounce.js)

## useDraggable

You can drag and drop an element。

``` js
const el = useRef();
const { x, y, pageX, pageY } = useDraggable(el);

return (
  <div>
    <div ref={el} className="DraggableBox" />
    <div>
      offset:：x:{x}，y:{y}
      pageX：{pageX}，pageY：{pageY}
    </div>
  </div>
);
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useDragger&module=%2Fsrc%2Fviews%2FUseDragger.js)

## useEventListener

``` js
const [coords, setCoords] = useState({ x: 0, y: 0 });

const inputRef = useRef(null);

const handler = useCallback(({ clientX, clientY }) => {
  setCoords({ x: clientX, y: clientY });
}, []);

useEventListener("mousemove", handler, inputRef);
```
[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useEventListener&module=%2Fsrc%2Fviews%2FUseEventListener.js)

## useFavicon

Add or replace the favicon of the current page

``` js
useFavicon(href:string)
```

## useGetter

Listen to read variables and respond to callback functions.

``` js
const [obj, setObj] = useState({ name: "Seven" });
useGetter(obj, (name, readValue) => {
  // dosomething
});
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useGetter&module=%2Fsrc%2Fviews%2FUseGetter.js)

## useImtArray

Achieving Immutable Array-like capabilities。

useImtArray(imtArr:any[]):Imt

Support push、clear、removeIndex、removeVal、pop....

``` js
const input = useInput("");
const imtArr = useImtArray(["apple", "orange"]);
```

## useInput

Greatly simplified `<Input value='' onChange={({currentTarget})=>{}}>`...

useInput(initialVal?:string):InputOption

```js
InputOption.bind // bind Input
InputOption.clear // clear current Input value
InputOption.repalce // handler current Input string
```

``` js
const input = useInput("Seven");
return (
    <input className="input" {...input.bind} />
)
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useInput&module=%2Fsrc%2Fviews%2FUseInput.js)

## useLifeCycles

Alternative Life Cycle, Component Didmount and Component WillUnmount

useLifeCycles(mountFn?:() => void,unMountFn?:() => void)

``` js
useLifeCycles(() => {
  // didMount
},() => {
  // willUnmount
})
```

## useMergeState

Merge the current state, add or replace new attributes。

``` js
const [user, mergeState] = useMergeState({firstName: 'Seven'})
mergeState({lastName: 'Floyd'})
// user {firstName: 'Seven',lastName: 'Floyd'}
```

## usePrevious

Gets a value before the change, and returns it for the first time, optionally(initEqual: true), because in some cases Effect calls ahead of time and returns `undefine`.

usePrevious(preState:any,initEqual?:boolean)

```js
const [count, setCount] = useState(0);
const previousCouner = usePrevious(count); // 0

const changeCounter = () => {
  setCount(pre => pre + 1);
};
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=usePrevious&module=%2Fsrc%2Fviews%2FUsePrevious.js)

## usePromise

ReactHook version of Proise。

``` js
const request = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Success");
      } else {
        reject("Fail");
      }
    }, 1000);
  });
};
const [state, setState] = useState(0);
const { value, loading, error } = usePromise(request, [state]);
return (
  <p>
    result：{loading ? <span>Loading...</span> : <span>{error || value}</span>}
  </p>
)
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=usePromise&module=%2Fsrc%2Fviews%2FUsePromise.js)

## useRaf

Create tasks through requestAnimationFrame。

useRaf(fn:() => void, initRun:boolean):RafControl

```js
const [min, setMin] = useState(0);
const [second, setsecond] = useState(0);
const run = () => {
  setsecond(pre => {
    let newSecond = pre + 1;
    if (newSecond > 60) {
      setMin(preMin => preMin + 1);
      return 0;
    }
    return newSecond;
  });
};
const [start, stop] = useRaf(run, false);
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=%2FrunClock)

## useScript

Loading Script dynamically and preventing duplicate loading.

useScript(src:string):void

``` js
useScript('https://cdn.bootcss.com/react/16.9.0-rc.0/cjs/react.development.js')
```

## useSpeech

Ability to read text。

useSpeech(text:string,volume?:number):void

``` js
useSpeech('hellow world')
```

## useTheme

Quickly replace a set of subject variables. Through `document.documentElement. style.setProperty()'.

```js
useTheme(themes);
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useTheme&module=%2Fsrc%2Fviews%2FUseTheme.js)

## useThrottle

Throttling function Hooks。

``` js
const throttledValue = useThrottle(value => value, [val], 1000);
```

[![Edit serverless-morning-r2svr](https://user-gold-cdn.xitu.io/2019/9/6/16d062eded131c41?w=201&h=42&f=svg&s=21059)](https://codesandbox.io/s/serverless-morning-r2svr?fontsize=14&initialpath=useThrottle&module=%2Fsrc%2Fviews%2FUseThrottle.js)

## useThrottleVal

As above, But based on original value Hooks。

``` js
const throttledValue = useThrottle(value => value, [val], 1000);
```

## LICENSE

MIT
