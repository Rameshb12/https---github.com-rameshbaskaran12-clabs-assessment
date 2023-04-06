import React, { useState } from 'react'
import './FormSegment.css';
import Select from "react-select";
import Button from 'react-bootstrap/Button';

function BackupFormSegment() {  
    //state for name of the segment
    const [segmentName, setSegmentName] = useState("") 

    //state for schema
    const [schemas, setSchemas] = useState([])

    //dropdown options
    let dropdownValues = [
        { value: "first_name", label: "First Name" },
        { value: "last_name", label: "Last Name" },
        { value: "gender", label: "Gender" },
        { value: "age", label: "Age" },
        { value: "account_name", label: "Account Name" },
        { value: "city", label: "City" },
        { value: "state", label: "State" }
    ];

    //functions for filtering unselected options
    const [selectedSchema, setSelectedSchema]= useState(null);
    const [unselectedValues, setUnselectedValues] = useState(dropdownValues);
    
    let [selectedDropdownValues, setSelectedDropdownValues] = useState([]);

    //function for handling segment change
    const handleSegmentChange = (event) => {
        setSegmentName(event.target.value)
    }

    //function for handling schema change
    const handleSchemaChange = (event) => { 
        setSelectedSchema(event);
    }    

    //function for adding schema
    const handleAddSchema = () => {
        setSchemas([...schemas, selectedSchema]);
        setSelectedSchema(null);
        setSelectedDropdownValues([...selectedDropdownValues, selectedSchema]);
        setUnselectedValues(dropdownValues.filter(value => ![...selectedDropdownValues, selectedSchema].some(value2 => value.label == value2.label)))
        console.log(dropdownValues.filter(value => ![...selectedDropdownValues, selectedSchema].some(value2 => value.label == value2.label)));
    }

    //function for handel submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const schemasToSend = {}
        schemas.forEach(schema => {
            schemasToSend[`${schema.value}`] = schema.label;
        })
        const response = await fetch("https://webhook.site/34b1f1df-3f24-4ce0-b78a-109535d07617", {
            method: "POST",
            body: JSON.stringify({segmentName, schemas:schemasToSend})
        });
        console.log(response.json()) ;
    }
    
  return (
    //UI of the form
    <form onSubmit={handleSubmit}>
        <label htmlFor="segment_name" className="form-input-label">
            Enter the Name of the Segment
        </label>
        <input
            type="text"
            name="segmentName"
            value={segmentName}
            placeholder="Name of the Segment"
            autoComplete="off"
            className="form-input-item my-4"
            onChange={handleSegmentChange}
        />
        <p>To save your segment, you need to add the schemas to build the query</p>
        <br />
        {schemas.length> 0 && schemas.map((schema, index) => (
            <div key={index}>
                <Select
                    name="schemas"
                    value={schema}
                    placeholder="Add Schema to the Segment"
                    options={[schema]}
                    onChange={handleSchemaChange}
                    className='select-dropdown'
                />
            </div>
        )) }
        <Select
            id={Math.random()}
            name="schemas"
            onChange={handleSchemaChange}
            placeholder="Add Schema to the Segment"
            className='select-dropdown'
            options={unselectedValues}
        />

        <div className='add-schema'>
            {selectedSchema && <a onClick={handleAddSchema} className='add-schema-link'>+Add new schema</a>}
        </div>
        <div className='form-footer'>
            <Button type='submit' onClick={handleSubmit} variant="success">Save the segment</Button>
            <Button variant="outline-danger">Cancel</Button>
        </div>
        
  </form>
  )
}

export default BackupFormSegment