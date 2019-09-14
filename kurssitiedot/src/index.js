import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return <h2>{props.name}</h2>
}

const Part = props => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => {
  return <>
    {props.parts.map((x, i) => 
      <Part 
        key={x.name + i}
        name={x.name}
        exercises={x.exercises}
      />    
    )}
  </>
} 

const Total = (props) => {
  const amount = props.parts.reduce((a, b) => 
    {
      if ( typeof a === 'number') {
        return a + b.exercises
      }
      return a.exercises + b.exercises
    }
  )
  return <p><strong>Number of exercises {amount}</strong></p>
}

const Course = (props) => {
  return <>
    <Header name={props.course.name} />
    <Content parts={props.course.parts}/>
    <Total parts={props.course.parts}/>
  </>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const mapCourses = () => courses.map((x, i) => 
      <Course key={x.name + i} course={x} />
  )

  return (
    <div>
      <h1>Web development curriculum</h1>
      {mapCourses()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
