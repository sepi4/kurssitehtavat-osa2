import React from 'react'

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

export default Course
