import { useEffect, useMemo, useReducer, useRef, useState } from "react"

export const HookSample=()=>{
    return(
        <div className="grid grid-cols-3 grid-rows-3 gap-6 w-screen bg-amber-500">
            <UseStateSample/>
            <UseRefSample/>
            <UseEffectSample/>
            <UseReducerSample/>
            <UseMemoSample/>
            <ReactMemoSample/>
        </div>
    )
}

const UseStateSample=()=>{
    const [num,setNum]=useState(0)
    return(
        <div className="flex flex-col justify-start border p-3 items-center gap-5">
            <p className="font-bold text-xl">useState sample</p>
            <p>num:{num}</p>
            <input type='number' className="border p-1 w-[80%]" onChange={(e)=>{setNum(e.target.value);console.log('rerender bởi useState Sample')}} placeholder="nhập num"/>
        </div>
    )
}

const UseRefSample=()=>{
    const focusInput=useRef(null)
    const countRef=useRef(0);

    return(
        <div className="flex flex-col justify-start border p-3 items-center gap-5">
            <p className="font-bold text-xl">useRef sample</p>
            <input type='text' ref={focusInput} onChange={(e)=>{countRef.current=e.target.value;console.log('countRef:',countRef);}} className="bg-amber-50 border pl-4 w-full"/>
            <button onClick={()=>{focusInput.current.focus()}}>Focus input and inc countRef</button>
        </div>
    )
}

const UseEffectSample=()=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        fetch('https://67cd6670dd7651e464ee43e8.mockapi.io/Recipe')
        .then(res=>res.json())
        .then(data=>{
            setdata(data)
        })
    },[])
    return(
        <div className="flex flex-col justify-start border p-3 items-center gap-5">
            <p className="font-bold text-xl">useEffect sample</p>
            <div className="flex flex-col gap-2 items-start ">
                {data.map((item,index)=>(
                    <p key={index} className="text-start">-{item.name}</p>
                ))}
            </div>
        </div>
    )
}

const UseReducerSample=()=>{
    const counterReducer=(state,action)=>{
        switch (action) {
            case "+":
                return ++state
            case "-":
                return --state
            default:
                break;
        }
    }
    const [counter,counterDispatch]=useReducer(counterReducer,0)
    return(
        <div className="flex flex-col justify-start border p-3 items-center gap-5">
            <p className="font-bold text-xl">useReducer sample</p>
            <p>counter:{counter}</p>
            <button className="text-white" onClick={()=>counterDispatch("+")}>+</button>
            <button className="text-white" onClick={()=>counterDispatch("-")}>-</button>
        </div>
    )
    
}

const UseMemoSample=()=>{
    const [state,setState]=useState(1);
    const [number,setNumber]=useState(0);
    const superHeavyCalculation=(number)=>{
        let result=0;
        for(let i=0;i<10;i++)
            result+=number;
        console.log("vừa tính toán siu nặng");
        return result
    }
    let result=useMemo(()=>superHeavyCalculation(number),[number])

    return(
        <div className="flex flex-col justify-start border p-3 items-center gap-5">
            <p className="font-bold text-xl">useMemo sample</p>
            <p>result={result}</p>
            <input type='number' onChange={(e)=>{setNumber(Number(e.target.value))}} placeholder="thay đổi số để useMemo thực hiện phép tính" className="border bg-white ps-3 w-full"/>
            <button onClick={()=>setState(state==1?2:1)}>đổi state để comp re render</button>
        </div>
    )
}

const ChildCompReactMemo=React.memo(({num})=>{
    console.log("childcomp re render trong React.memo sample");
    return(
        <div className="h-[50%] w-[50%] bg-blue-300 flex items-center justify-center">
            <p>prop truyền vào là số {num/2==0?"chẵn":"lẻ"}</p>
        </div>
    )
})

const ReactMemoSample=()=>{
    const [num,setNum]=useState(0);
    const inputRef=useRef(null)
    return(
        <div className="flex flex-col justify-start border p-3 items-center gap-5">
            <p className="font-bold text-xl">React.memo sample</p>
            <input type="number" className="border bg-white bs-3 w-" ref={inputRef}/>
            <button onClick={()=>setNum(inputRef.current.value)} className="text-white">bấm để truyền prop</button>
            <ChildCompReactMemo num={num}/>
        </div>
    )
}