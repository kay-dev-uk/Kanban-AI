import React, { useEffect, useState } from 'react'
import { decode } from 'html-entities';
import "../../index.css"

export const StackCard = () => {

    const [stack, setStack] = useState()
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [states, setStates] = useState(false)
    const [titleView, setTitleView] = useState(true)
    const [latest, setLatest] = useState("question")

    const clickHandler = (states) => {
        setStates(!states)
    }
    const viewHandler = (states) => {
        setTitleView(!states)
    }
    const titleHandler = (e) => {
        setTitle(e.target.value.replace(" ", "%20"))
        setLatest("question")
    }
    const tagHandler = (e) => {
        setTag(e.target.value.replace(" ", "%20"))
        console.log("using tags")
        setLatest("tags")
        console.log(latest)
    }

    useEffect(() => {

        const fetchDataTitle = async () => {
            try {
                if (latest === "question") {
                    const response = await fetch(`https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${title}&site=stackoverflow`)
                    const data = await response.json()
                    setStack(data.items)
                    console.log("using questions")
                }
                if (latest === "tags") {
                    const responsetags = await fetch(`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tag}&site=stackoverflow`)
                    const datatags = await responsetags.json()
                    setStack(datatags.items)
                    console.log("using tags")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataTitle()
    }, [states])

    const rendering = (titleView) => {

        if (titleView) {
            return (
                <label>
                    <div className='input-section-stack block color-text-4 font-bold mb-4 text-center '>
                        Question to ask:
                        <br />
                        <input className='input-line-stack block appearance-none w-full bg-blue-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-none h-auto' type="text" name="question" onChange={titleHandler} />
                    </div>
                </label>
            )
        } else {
            return (
                <label>
                    <div className='input-section-stack block color-text-4 font-bold mb-4 text-center '>
                        look for tag(s):
                        <br />
                        <input className='input-line-stack block appearance-none w-full bg-blue-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-none h-auto' type="text" name="tag" onChange={tagHandler} />
                    </div>
                </label>)
        }
    }

    const stackCard = (data) => {

        return (<>
            <div className="stackContainer">
                {data.map((e, i) => (
                    e.is_answered == true ?
                        <div className='stackCard'>
                            <li key={i}><a href={e.link}>{decode(e.title, { level: 'html5' })}</a></li>
                            <li > tags :{e.tags.toString()}</li>
                        </div>
                        :
                        null
                ))}
            </div>
            <button className='remove-stack-view' onClick={() => clickHandler(states)} >back</button>
        </>
        )
    }

    return (
        <div className='parent-container-stack m-2 w-64 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3 absolute bottom-40 right-40'>
            {rendering(titleView)}
            <button className='bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black undefined' id="view-button" onClick={() => { viewHandler(titleView) }}>{titleView == true ? "look for tags" : "look with title"}</button> <br />
            <button className='bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black undefined' id="question-button" onClick={() => { clickHandler(states) }}>Click me to get the questions</button>
            {states ? <ul>{stack && stackCard(stack)}</ul> : null}
        </div>

    )
}
