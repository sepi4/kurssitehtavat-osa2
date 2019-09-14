import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = props => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => {
  return <>
    {props.parts.map(x => <Part 
      name={x.name}
      exercises={x.exercises}
      />    
    )}
  </>
}

const Total = (props) => {
  let amount = 0;
  props.parts.forEach((x) => amount += x.exercises)
  return <p>Number of exercises {amount}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
