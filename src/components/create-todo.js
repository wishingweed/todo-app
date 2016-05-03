import React from 'react';

export default class CreateTodo extends React.Component{
	constructor(props){
		super(props);
		this.state = { error:null };
	}

	renderError(){
		return(
			<div>{this.state.error}</div>
		);
	}


	render(){
		return(
			<form onSubmit={this.handleCreate.bind(this)}>
				<input type="text" placeholder="What do I need to do" ref="createInput"/>
				{this.renderError()}
				<button> Create</button>
			</form>
			);
	}
	handleCreate(event)
	{
		event.preventDefault();//这句保证了上面的what do I need to do不被加进去。
		const createInput = this.refs.createInput;
		const task = createInput.value;
		const validateInput = this.validateInput(task);
	
		this.setState({error:validateInput});

		if(validateInput==null)
		{
			this.props.createTask(this.refs.createInput.value);
			this.refs.createInput.value='';
		}
	}

	validateInput (task)
	{
		console.log(this.props);
		const foundTodo = _.find(this.props.todos, todo=> todo.task === task);	
		if(task == '')
			return ("Please Input something");
		else
		if(foundTodo)
			return ("the Input is duplicate");
		else
			return (null);
	}
}
