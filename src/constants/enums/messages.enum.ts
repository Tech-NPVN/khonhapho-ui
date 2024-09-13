enum MsgValidation {
  /**
   * Id - MSG01
   * Type - In red, under the text box
   * Context - Bỏ trống field họ tên
   */
  REQUIRED = 'Cần nhập mục này!',

  /**
   * Id - MSG02
   * Type - In red, under the text box
   * Context - Bỏ trống field SDT
   */
  PHONE_NUMBER_REQUIRED = 'Cần nhập số điện thoại!',

  /**
   * Id - MSG03
   * Type - In red, under the text box
   * Context - Nhập sai định dạng CCCD
   */
  IDENTITY_INVALID = 'CCCD chưa hợp lệ!',

  /**
   * Id - MSG04
   * Type - In red, under the text box
   * Context - Nhập sai định dạng “Email”
   */
  EMAIL_INVALID = 'Email chưa hợp lệ!',

  /**
   * Id - MSG05
   * Type - In red, under the text box
   * Context - Nhập input không phải là số vào Field “SDT người thân”
   */
  PHONE_NUMBER_INVALID = 'Số điện thoại chưa hợp lệ!',

  /**
   * Id - MSG06
   * Type - In red, under the text box
   * Context - Bỏ trống field “Mật khẩu”
   */
  PASSWORD_REQUIRED = 'Cần nhập mật khẩu!',

  /**
   * Id - MSG07
   * Type - In red, under the text box
   * Context - Nhập input <6 ký tự vào Field “Mật khẩu”
   */
  PASSWORD_TOO_SHORT = 'Cần nhập ít nhất 6 ký tự!',

  /**
   * Id - MSG08
   * Type - In red, under the text box
   * Context - Bỏ trống field “Xác nhận mật khẩu”
   */
  CONFIRM_PASSWORD_REQUIRED = 'Cần xác nhận lại mật khẩu!',

  /**
   * Id - MSG09
   * Type - In red, under the text box
   * Context - Nhập input không trùng với Field “Mật khẩu” vào Field “Xác nhận mật khẩu”
   */
  PASSWORD_MISMATCH = 'Nhập lại mật khẩu không hợp lệ!',

  /**
   * Id - MSG10
   * Type - In red, under the text box
   * Context - Bỏ trống field “Số điện thoại hoặc CCCD”
   */
  CONTACT_INFO_REQUIRED = 'Cần nhập số điện thoại hoặc CCCD!',

  /**
   * Id - MSG11
   * Type - In red, under the text box
   * Context - Nhập sai định dạng vào Field “Số điện thoại hoặc CCCD”
   */
  CONTACT_INFO_INVALID = 'Số điện thoại hoặc CCCD chưa chính xác!',

  /**
   * Id - MSG16
   * Type - In red, under the text box
   * Context - Bỏ trống Field “Thành phố” ( Đăng bài Khách cần mua gấp)
   */
  SELECT_REQUIRED = 'Bạn cần chọn mục này!',

  /**
   * Id - MSG36
   * Type - In red, under the text box
   * Context - Bỏ trống Field “phòng ban”
   */
  DEPARTMENT_FIELD_REQUIRED = 'Cần chọn phòng ban',

  /**
   * Id - MSG44
   * Type - In red, under the text box
   * Context - Chỉnh sửa Sticker
   */
  STICKER_EDIT_NOT_AUTHORIZED = 'Bạn không được cấp quyền truy cập thông tin này!',

  /**
   * Id - MSG45
   * Type - In red, under the text box
   * Context - Bỏ chọn Sticker
   * @deprecated [STICKER_EDIT_NOT_AUTHORIZED]
   */
  STICKER_UNSELECT_NOT_AUTHORIZED = 'Bạn không được cấp quyền truy cập thông tin này!',

  /**
   * Id - MSG46
   * Type - In red, under the text box
   * Context - Đăng tin - Bỏ trống Field : Nội dung
   */
  POST_CONTENT_REQUIRED = 'Nội dung dài ít nhất 50 ký tự!',

  /**
   * Id - MSG47
   * Type - In red, under the text box
   * Context - Bỏ trống Field "Số điện thoại chủ nhà"
   */
  OWNER_PHONE_REQUIRED = 'Bạn cần nhập mục này',

  /**
   * Id - MSG47
   * Type - In red, under the text box
   * Context - Bỏ trống Field "Số điện thoại chủ nhà"
   * @deprecated [PHONE_NUMBER_INVALID]
   */
  OWNER_PHONE_INVALID = 'Số điện thoại chưa hợp lệ!',

  /**
   * Id - MSG48
   * Type - In red, under the text box
   * Context - Bỏ trống các Field ảnh
   */
  IMAGES_REQUIRED = 'Bạn cần thêm mục này',

  /**
   * Id - MSG49
   * Type - In red, under the text box
   * Context - Nhập sai Field "Thông số nhà"
   */
  HOUSE_SPECS_INVALID = 'Bạn cần nhập chính xác diện tích!',

  /**
   * Id - MSG50
   * Type - In red, under the text box
   * Context - Bỏ trống các Field "Báo cáo dẫn khách"
   */
  CUSTOMER_REPORT_REQUIRED = 'Yêu cầu nhập trường này!',

  /**
   * Id - MSG64
   * Type - In red, under the text box
   * Context - Bỏ trống field "Email"
   */
  EMAIL_REQUIRED = 'Cần nhập email!',
}

enum MsgToast {
  /**
   * Id - MSG12
   * Type - Toast message
   * Context - Nhập sai field “Số điện thoại hoặc CCCD” (account chưa tồn tại trên DB)
   */
  ACCOUNT_NOT_FOUND = 'Không tồn tại tài khoản này trên hệ thống!',

  /**
   * Id - MSG13
   * Type - Toast message
   * Context - Nhập sai field “Mật khẩu” (account không phải là 1 cặp trong DB)
   */
  PASSWORD_INCORRECT = 'Mật khẩu không chính xác!',

  /**
   * Id - MSG14
   * Type - Toast message
   * Context - Ghim bài viết
   */
  PIN_POST_SUCCESS = 'Cập nhật thành công!',

  /**
   * Id - MSG15
   * Type - Toast message
   * Context - Báo cáo bài viết
   */
  REPORT_POST_UNDER_DEVELOPMENT = 'Tính năng đang phát triển',

  /**
   * Id - MSG17
   * Type - Toast message
   * Context - Click button (chia sẻ bài viết)
   */
  COPY_LINK_SUCCESS = 'Đã sao chép liên kết!',

  /**
   * Id - MSG18
   * Type - Toast message
   * Context - Đăng bài tin hoạt động
   */
  POST_ACTIVITY_SUCCESS = 'Thêm tin đăng thành công!',

  /**
   * Id - MSG19
   * Type - Toast message
   * Context - Khoá bình luận bài viết
   */
  DISABLE_COMMENTS_SUCCESS = 'Khóa bình luận bài viết thành công!',

  /**
   * Id - MSG20
   * Type - Toast message
   * Context - Mở khoá bình luận bài viết
   */
  ENABLE_COMMENTS_SUCCESS = 'Mở khóa bình luận bài viết thành công!',

  /**
   * Id - MSG22
   * Type - Toast message
   * Context - Xác nhận xoá bài viết
   */
  DELETE_POST_SUCCESS = 'Xóa thành công!',

  /**
   * Id - MSG23
   * Type - Toast message
   * Context - Đặt lịch thành công
   */
  SCHEDULE_SUCCESS = 'Đặt lịch thành công!',

  /**
   * Id - MSG24
   * Type - Toast message
   * Context - Cập nhật hồ sơ
   */
  UPDATE_PROFILE_SUCCESS = 'Cập nhật hồ sơ thành công!',

  /**
   * Id - MSG25
   * Type - Toast message
   * Context - Đổi mật khẩu
   */
  CHANGE_PASSWORD_SUCCESS = 'Đổi mật khẩu thành công!',

  /**
   * Id - MSG26
   * Type - Toast message
   * Context - Duyệt bài đăng
   */
  APPROVE_POST_SUCCESS = 'Cập nhật tin đăng thành công!',

  /**
   * Id - MSG27
   * Type - Toast message
   * Context - Xoá tin chính chủ
   */
  DELETE_VERIFIED_POST_DENIED = 'Bạn không được cấp quyền truy cập thông tin tin này!',

  /**
   * Id - MSG28
   * Type - Toast message
   * Context - Sửa tài khoản
   */
  UPDATE_ACCOUNT_SUCCESS = 'Cập nhật thông tin tài khoản thành công!',

  /**
   * Id - MSG29
   * Type - Toast message
   * Context - Mời vào ban đào tạo
   */
  INVITE_TO_TRAINING_SUCCESS = 'Mời vào ban đào tạo thành công!',

  /**
   * Id - MSG30
   * Type - Toast message
   * Context - Kích khỏi ban đào tạo
   */
  REMOVE_FROM_TRAINING_SUCCESS = 'Kích khỏi ban đào tạo thành công!',

  /**
   * Id - MSG31
   * Type - Toast message
   * Context - Gắn huy hiệu
   */
  ASSIGN_BADGE_SUCCESS = 'Cập nhật huy hiệu cho tài khoản này thành công!',

  /**
   * Id - MSG32
   * Type - Toast message
   * Context - Tạm dừng (Khoá tài khoản)
   */
  SUSPEND_ACCOUNT_SUCCESS = 'Khoá tài khoản thành công!',

  /**
   * Id - MSG33
   * Type - Toast message
   * Context - Gia hạn tài khoản
   */
  EXTEND_ACCOUNT_SUCCESS = 'Gia hạn thành công!',

  /**
   * Id - MSG34
   * Type - Toast message
   * Context - Mở khoá tài khoản
   */
  UNLOCK_ACCOUNT_SUCCESS = 'Mở khoá tài khoản thành công!',

  /**
   * Id - MSG35
   * Type - Toast message
   * Context - Dừng hợp tác
   */
  TERMINATE_COOPERATION_SUCCESS = 'Kick tài khoản thành công!',

  /**
   * Id - MSG37
   * Type - Toast message
   * Context - Bỏ trống Field “Chi nhánh”
   */
  BRANCH_FIELD_REQUIRED = 'Cần chọn chi nhánh',

  /**
   * Id - MSG38
   * Type - Toast message
   * Context - Tạo mã giới thiệu
   */
  CREATE_INTRO_CODE_SUCCESS = 'Tạo mã giới thiệu thành công!',

  /**
   * Id - MSG39
   * Type - Toast message
   * Context - Xoá dữ liệu kho hàng: Tình trạng pháp lý-Khoản giá-Khoản diện tích-Trạng thái mua bán-Loại hợp đồng-Loại hình bất động sản-Dự án
   */
  DELETE_STORAGE_DATA_DENIED = 'Bạn không được cấp quyền truy cập thông tin này',

  /**
   * Id - MSG40
   * Type - Toast message
   * Context - Chỉnh sửa dữ liệu “Đặc điểm BĐS”
   */
  UPDATE_REAL_ESTATE_FEATURE_FAILED = 'Cập nhật đặc điểm BĐS thất bại',

  /**
   * Id - MSG41
   * Type - Toast message
   * Context - Xoá đặc điểm dữ liệu “Đặc điểm BĐS”
   */
  DELETE_REAL_ESTATE_FEATURE_FAILED = 'Xoá đặc điểm BĐS thất bại',

  /**
   * Id - MSG42
   * Type - Toast message
   * Context - Chỉnh sửa huy hiệu
   */
  UPDATE_BADGE_SUCCESS = 'Cập nhật thông tin huy hiệu thành công!',

  /**
   * Id - MSG43
   * Type - Toast message
   * Context - Xoá huy hiệu
   */
  BADGE_DELETE_SUCCESS = 'Xoá huy hiệu thành công',

  /**
   * Id - MSG51
   * Type - Toast message
   * Context - Đánh giá đầu chủ thành công
   */
  LANDLORD_REVIEW_ADD_SUCCESS = 'Thêm thành công',

  /**
   * Id - MSG52
   * Type - Toast message
   * Context - Gửi đánh giá thành công
   */
  LANDLORD_REVIEW_SEND_SUCCESS = 'Gửi đánh giá thành công',

  /**
   * Id - MSG53
   * Type - Toast message
   * Context - Thêm mới ứng viên vòng 0
   */
  CANDIDATE_ADD_SUCCESS = 'Thêm ứng viên thành công',

  /**
   * Id - MSG54
   * Type - Toast message
   * Context - Sửa ứng viên thành công
   */
  CANDIDATE_UPDATE_SUCCESS = 'Sửa ứng viên thành công',

  /**
   * Id - MSG55
   * Type - Toast message
   * Context - Xoá ứng viên thành công
   */
  CANDIDATE_DELETE_SUCCESS = 'Xoá ứng viên thành công',

  /**
   * Id - MSG56
   * Type - Toast message
   * Context - Duyệt tin đăng
   */
  POST_APPROVAL_SUCCESS = 'Cập nhật thành công',

  /**
   * Id - MSG57
   * Type - Toast message
   * Context - Gỡ tin đăng
   */
  POST_DELETE_SUCCESS = 'Gỡ tin đăng thành công',

  /**
   * Id - MSG58
   * Type - Toast message
   * Context - Nhập sai Field "Thông số nhà"
   */
  HOUSE_SPECS_FLOOR_INVALID = 'Bạn cần nhập chính xác Số tầng!',

  /**
   * Id - MSG59
   * Type - Toast message
   * Context - Nhập sai Field "Thông số nhà"
   */
  HOUSE_SPECS_PRICE_INVALID = 'Bạn cần nhập chính xác Giá!',

  /**
   * Id - MSG60
   * Type - Toast message
   * Context - Nhập sai Field "Thông số nhà"
   */
  HOUSE_SPECS_MIN_PRICE_INVALID = 'Cần nhập số tiền tối thiểu từ 200 triệu trở lên',

  /**
   * Id - MSG61
   * Type - Toast message
   * Context - Xoá lịch hẹn/thu hồi/xác nhận
   */
  APPOINTMENT_STATUS_UPDATE_SUCCESS = 'Cập nhật trạng thái thành công!',

  /**
   * Id - MSG63
   * Type - Toast message
   * Context - Tạo bộ sưu tập
   */
  COLLECTION_CREATE_SUCCESS = 'Thêm mới thành công!',
}

enum MsgPopup {
  /**
   * Id - MSG21
   * Type - Pop-up
   * Context - Xoá bài viết
   */
  DELETE_POST_CONFIRM = 'Bạn muốn xóa bài viết này?',
}

export { MsgValidation, MsgToast, MsgPopup };
