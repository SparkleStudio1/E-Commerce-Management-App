import "./content-modal.css";
import { ReactNode } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PagesType, useGlobalContext } from "../../context/GlobalContext";
import { fetchData } from "../../functions/FetchData";

type ContentModalProps<T> = {
  name: PagesType;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ContentModal<T>({
  open,
  setOpen,
  name,
  setData,
}: ContentModalProps<T>) {
  const [form] = Form.useForm();
  const { endpoint, setLoader } = useGlobalContext();

  const handleFormSubmit = async (param: PagesType) => {
    fetchData(`${endpoint}/${param}`, {
      method: "post",
      data: form.getFieldsValue(),
    })
      .then(() => {
        setLoader(true);
        return fetchData(`${endpoint}/${param}`);
      })
      .then((res) => {
        setData(res);
        setLoader(false);
      });

    handleCancel();
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  function renderSwitch(param: PagesType): ReactNode {
    switch (param) {
      case "category":
        return (
          <Form
            name="category form"
            form={form}
            onFinish={() => handleFormSubmit(name)}
            autoComplete="off"
          >
            <Form.Item
              label="Category Name"
              name="categoryName"
              rules={[
                { required: true, message: "Please input category name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input category description!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        );
      default:
        return;
    }
  }

  return (
    <Modal
      title={`Add New ${name}`}
      centered
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={() => handleCancel()}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      {renderSwitch(name)}
    </Modal>
  );
}

export default ContentModal;
