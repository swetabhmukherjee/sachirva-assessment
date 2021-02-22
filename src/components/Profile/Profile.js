import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Form, Input, InputNumber, Button } from "antd";

import ProfileItem from "./ProfileItem";

const Profile = () => {
  const [profileItems, setProfileItems] = useState({});
  const [profile, setProfile] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProfileItems(data));
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (profileObj) => {
    setProfile(profileObj);
    const { id, name, email, phone, website } = profileObj;
    showModal();
    setImmediate(() =>
      form.setFieldsValue({
        name,
        email,
        phone,
        website,
      })
    );
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log(values);

    const elementsIndex = profileItems.findIndex(
      (element) => element.id === profile.id
    );
    let newArray = [...profileItems];
    newArray[elementsIndex] = {
      ...values,
    };

    setProfileItems(newArray);
  };

  /* if (profile) {
    form.setFieldsValue({
      // name: profile.name,
      // email: profile.email,
      /* name: "",
      email: "",
    });
  } */

  return (
    <div className="ant-row">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {console.log("modal", profile)}
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            // name={["user", "name"]}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            // name={["user", "email"]}
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            // name={["user", "age"]}
            name="phone"
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {profileItems.length > 0 &&
        profileItems.map((profile, index) => (
          <div
            key={index}
            className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-8 ant-col-lg-8 ant-col-xl-6 mb-2"
          >
            <ProfileItem
              profileItems={profileItems}
              setProfileItems={setProfileItems}
              profile={profile}
              showModal={showModal}
              setProfile={setProfile}
              handleEdit={handleEdit}
            />
          </div>
        ))}
    </div>
  );
};

export default Profile;
