import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useState } from "react";
import { Modal } from "semantic-ui-react";
import { color, font } from "^@styles/global";
import { CustomizedButton } from "..";
import { RequestAction } from "./RequestAction";
import CSS from "csstype";

export interface CustomizedRequestModalProps {
  requestID: number;
  campaignName: string;
  action: RequestAction;
  triggerDisabled: boolean;
  triggerStyle?: CSS.Properties;
  onConfirm: () => Promise<void>;
}

export const CustomizedRequestModal = ({
  action,
  requestID,
  campaignName,
  triggerDisabled,
  triggerStyle,
  onConfirm,
}: CustomizedRequestModalProps) => {
  const [open, setOpen] = useState(false);
  const [triggerLoading, setTriggerLoading] = useState(false);
  const { t } = useTranslation("common");

  const onCloseHandler = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpenHandler = useCallback(() => {
    setOpen(true);
  }, []);

  const onConfirmHandlerAsync = async () => {
    setTriggerLoading(true);
    try {
      await onConfirm();
    } catch (err) {
      console.log(err);
    }
    setTriggerLoading(false);
    onCloseHandler();
  };

  const onConfirmHandler = useCallback(() => {
    onConfirmHandlerAsync();
  }, []);

  return (
    <Modal
      open={open}
      onOpen={onOpenHandler}
      onClose={onCloseHandler}
      trigger={
        <CustomizedButton
          size="small"
          content={action}
          loading={triggerLoading}
          disabled={triggerDisabled}
          style={triggerStyle}
        />
      }
    >
      <Modal.Header style={{ fontFamily: font.poppins, fontSize: "2em" }}>
        {t("components.customizedRequestModal.title", {
          action: action,
        })}
      </Modal.Header>
      <Modal.Content>
        <div style={{ fontFamily: font.poppins }}>
          {t("components.customizedRequestModal.content", {
            requestID: requestID,
            action: action,
            campaignName: campaignName,
          })}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <CustomizedButton
          content={t("components.customizedRequestModal.cancel")}
          onClick={onCloseHandler}
          size="small"
          loading={false}
          style={{
            backgroundColor: color["dark-grey"],
            color: color.white,
          }}
        />
        <CustomizedButton
          content={action}
          onClick={onConfirmHandler}
          size="small"
          loading={false}
        />
      </Modal.Actions>
    </Modal>
  );
};
