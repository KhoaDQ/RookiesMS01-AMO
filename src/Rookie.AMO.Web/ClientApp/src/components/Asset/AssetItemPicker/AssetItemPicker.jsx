import React, { Fragment } from "react";
function UserItemPick(props) {
  let { asset, setCurrentAsset, currentAsset } = props;

  //console.log(asset.id === currentAsset.id);

  const onChange = () => {
    setCurrentAsset(asset);
  };

  return (
    <Fragment>
      <tr
        key={asset.id}
        //onClick={handleShowInfoUser}
        className="detail-item"
      >
        <td>
          <input
            type="radio"
            name="select"
            checked={asset.id === currentAsset.id}
            onChange={onChange}
          />
        </td>
        <td>{asset.name}</td>
        <td>{asset.categoryName}</td>
        <td>{asset.state}</td>
      </tr>
    </Fragment>
  );
}
export default UserItemPick;
