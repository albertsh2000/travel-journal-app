import React from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useLanguageStore } from "../stores/useLanguageStore";
import { changeAppLanguage } from "../i18n";
const languages = {
  en: "English",
  ru: "Русский",
  hy: "Հայերեն",
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();

  const handleMenuClick = async ({ key }) => {
    await changeAppLanguage(key);
    setLanguage(key);
  };

  const menuItems = Object.entries(languages).map(([key, label]) => ({
    key,
    label,
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
    >
      <Button>
        {languages[language]} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
