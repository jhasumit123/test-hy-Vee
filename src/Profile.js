import { isEmpty } from 'lodash';
import React, { useRef, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Profile = () => {
    const inputRef = useRef();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')


    const getUserDetails = async () => {
        const url = inputRef.current.value || '';
        try {
            const apiUrl = `https://api.agify.io?name=${url}`
            const response = await fetch(apiUrl, {
                method: 'GET',
            }).then((res) => {
                return res.json()
            }).then((data) => {
                setAge(data.age);
            });
            const gender = await fetch(`https://api.genderize.io?name=${url}`, {
                method: 'GET',
            }).then((res) => {
                return res.json()
            }).then((data) => {
                setGender(data.gender);
            });
            const national = await fetch(`https://api.nationalize.io?name=${url}`, {
                method: 'GET',
            }).then((res) => {
                return res.json()
            }).then((data) => {
                setNationality(data.country);
            });
        } catch (error) {
            return;
        }
    }


    return (
        <>
            <div class="search__input-wrap mt-5">
                <input className="search__input mt-5" id="search" type="text" name="search" placeholder="Search…" ref={inputRef} />
                <button className="search__button" onClick={getUserDetails} name="search-submit" aria-label="Search">
                    <svg class="search__icon" viewBox="0 0 36 36" width="36px" height="36px" aria-hidden="true">
                        <g className="search__icon-g" stroke="currentcolor" stroke-linecap="round" stroke-width="4" transform="translate(6,6)">
                            <ellipse className="search__icon-ellipse" fill="none" cx="9" cy="9" rx="7" ry="7" transform="rotate(45,9,9)" />
                            <line className="search__icon-line1" x1="15" y1="15" x2="21" y2="21" />
                            <line className="search__icon-line2" x1="21" y1="21" x2="15" y2="15" />
                            <line className="search__icon-line3" x1="21" y1="21" x2="15" y2="15" />
                        </g>
                    </svg>
                </button>
            </div>

            {!isEmpty(nationality) && age !== '' && gender !== '' &&
                <Card className=' mt-5 border' style={{ marginTop: '50px', border: '5px', borderColor: 'red' }}>
                    <Card.Body>
                        <Row>
                            <Col xs={2}>
                                <b>Age:-{" "}</b>{age}
                            </Col>
                            <Col xs={2}>
                                <b>Gender:-{" "}</b>{gender}
                            </Col>
                            <Col xs={2}>
                                <b>Nationality:-{" "}</b>{nationality[0].country_id}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            }
        </>
    )
}
export default Profile;