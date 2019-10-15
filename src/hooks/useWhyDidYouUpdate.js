import { useRef, useEffect } from 'react';
/**
 * Hook版本 WhyDidYouUpdate
 *
 * @export
 * @param {*} name 打印名称
 * @param {*} props 比对props
 */
function useWhyDidYouUpdate(name, props) {
  // 获取一个可变ref对象，我们可以在其中存储props ...
  // ... 以便下次运行此钩子时进行比较。
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // 从以前和当前props中获取所有关键点
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // 跟踪更改props
      const changesObj = {};
      // 遍历key
      allKeys.forEach(key => {
        // 如果前一个与当前不同
        if (previousProps.current[key] !== props[key]) {
          // 添加到changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // 如果changesobj不为空，则输出到控制台
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // 最后用当前的props更新先前的props以进行下一个hooks调用
    previousProps.current = props;
  });
}

export default useWhyDidYouUpdate;
