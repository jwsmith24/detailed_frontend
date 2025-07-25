import {useState} from 'react'


function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className={"flex flex-col gap-6"}>
      <div>

      </div>
      <h1><a href={"/rosters"} className={"text-6xl !text-white "}>Detailed</a></h1>

      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          The count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the title to get started.
      </p>
    </div>
  )
}

export default Home
