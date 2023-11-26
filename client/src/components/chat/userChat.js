import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/userFetchRecipient";
import avatar from '../../assets/avatar.svg'
function UserChat({ chat, user }) {
  const {recipientUser} = useFetchRecipientUser(chat, user);
  console.log(recipientUser,'userrrrrr');
  return<Stack
  direction="horizontal"
  gap={3}
  className="user-card align-items-center p-2 justify-content-between"
  role="button"
>
  
  <div className="d-flex align-items-center">
    <img src={avatar} height="35px" alt="User Avatar" />
    <div className="ml-2 text-content">
      <div className="name">{recipientUser?.name}</div>
      <div className="text">Text Message</div>
    </div>
  </div>
  <span className="user-online"></span>
  <div className="d-flex flex-column align-items-end">
    <div className="date">12-02-2023</div>
    <div className="this-user-notifications"></div>
  </div>
</Stack>

}

export default UserChat;
