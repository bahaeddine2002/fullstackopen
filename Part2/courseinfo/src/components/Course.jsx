const Header = ({name})=> <h1>{name}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts})=>{
    
    return(
        <div>
           { 
                parts.map((part)=>{
                return(
                    <Part key={part.id} part={part}/>
                )

                })
            }
        </div>
    )
}

const Sum =({parts})=>{
    

    return(
        <h4>total of {parts.reduce((sum,part)=>{
            return sum + part.exercises
        },0)} exercises
        </h4>
    )
}

const Course=({course})=>{
   
    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Sum parts={course.parts} />
        </div>
    )
}

export default Course