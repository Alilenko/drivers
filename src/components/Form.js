import React, { Component } from "react";
import { Form, Button } from "bootstrap-4-react";

const UserForm = ({ form, updateInput, submitForm, buttonText }) => {
  return (
    <Form>
      {form.name ? (
        <Form.Group>
          <label htmlFor="name">Full name</label>
          <Form.Input
            type="text"
            id="name"
            placeholder="Enter name and surname"
            name="name"
            required
            value={form.name}
            onChange={updateInput}
          />
        </Form.Group>
      ) : null}
      <Form.Group>
        <label htmlFor="email">Email address</label>
        <Form.Input
          type="email"
          id="email"
          placeholder="Enter email"
          name="email"
          required
          value={form.title}
          onChange={updateInput}
        />
      </Form.Group>
      <Form.Group>
        <label htmlFor="password">Password</label>
        <Form.Input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          required
          value={form.password}
          onChange={updateInput}
        />
      </Form.Group>
      <Button
        type="submit"
        onClick={submitForm}
        className="mb-3"
        warning
        lg
        style={{ width: "100%" }}
      >
        {buttonText}
      </Button>
    </Form>
  );
};

export default UserForm;
