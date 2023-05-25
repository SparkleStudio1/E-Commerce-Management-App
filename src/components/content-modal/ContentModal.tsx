import "./content-modal.css";
import { useEffect, ReactNode } from "react";
import { fetchData } from "../../functions/FetchData";
import { useGlobalContext, PagesType } from "../../context/GlobalContext";
import { Button, Modal, Form, Input } from "antd";

type ContentModalProps<T> = {
  name: PagesType;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
};

function ContentModal<T>({
  open,
  setOpen,
  name,
  setData,
  type,
}: ContentModalProps<T>) {
  const [form] = Form.useForm();

  const { endpoint, setLoader } = useGlobalContext();

  useEffect(() => {
    form.resetFields();
  }, [form]);

  // ==================== Functions ====================

  // Close Modal
  const onClose = () => {
    setOpen(false);
  };

  // Create New Item For Table
  const onSubmit = async (param: PagesType) => {
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

    onClose();
    form.resetFields();
  };

  // Render Different Form Inputs For Different Content
  const formRender = (param: PagesType): ReactNode => {
    switch (param) {
      case "category":
        return (
          <>
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
          </>
        );
      default:
        return;
    }
  };

  // ==================== Modal Component ====================
  return (
    <Modal
      title={`Add New ${name}`}
      centered
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="return" onClick={() => onClose()}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form
        name={`${name} form`}
        form={form}
        onFinish={() => onSubmit(name)}
        autoComplete="off"
      >
        {formRender(name)}
      </Form>
    </Modal>
  );
}

export default ContentModal;
