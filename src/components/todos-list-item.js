import React from 'react';

export default class TodosListItem extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isEditing : false
		};
	}
	renderActionSection(){
		if(this.state.isEditing)
			return(
						
						<td>
							<button onClick = {this.onSaveClick.bind(this)}> Save </button>
							<button onClick = {this.onCancleClick.bind(this)}> Cancle </button>
						</td>
				);
		return(
						
						<td>
							<button onClick = {this.onEditClick.bind(this)}> Edit </button>
							<button onClick = {this.onDeleteClick.bind(this)}> Delete </button>
						</td>
			);
	}
	renderTaskSection(){
		const {task,isCompleted} = this.props;
		const taskStyle = {
			color: isCompleted ? 'green' : 'red',
			cursor: 'pointer'
		}
		if(this.state.isEditing)
		{
			return(
				<td>
					<form onSubmit= {this.onSaveClick.bind(this)}>
						<input type = "text" defaultValue = {task} ref="editInput"></input>
					</form>
				</td>
			);
		}

		return (
            <td style={taskStyle}
                onClick={this.props.toggleTask.bind(this, task)}
            >
                {task}
            </td>
        );
	}

	render(){
		return(
			<tr>
				{ this.renderTaskSection() }
				{ this.renderActionSection() }
			</tr>
			);
		
	}
	onEditClick(){
		this.setState({isEditing :true});
	}
	onCancleClick(){
		this.setState({isEditing:false});
	}
	onSaveClick(event){
		event.preventDefault();
		const oldTask = this.props.task;
		const newTask = this.refs.editInput.value;
		this.props.saveTask(oldTask,newTask);

		this.setState({isEditing:false});
	}
	onDeleteClick(event)
	{
		const oldTask = this.props.task;
		this.props.deleteTask(oldTask);

		this.setState({isEditing:false});
	}
}
