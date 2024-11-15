import { IChatPreview } from '@/components/chat/chat-preview';

const IMAGE_SAMPLE = '/images/user-default.jpg';

const CHAT_PREVIEW_SAMPLE: {
  users: IChatPreview[];
  groups_default: IChatPreview[];
  groups: IChatPreview[];
} = {
  users: [
    {
      user: { name: 'CV Nguyễn Trung · NP-1234', avatar: '/images/user-default.jpg' },
      online: false,
    },
    {
      user: { name: 'CV Nguyễn Trung · NP-4242', avatar: '/images/user-default.jpg' },
      online: true,
    },
    {
      user: { name: 'CV Nguyễn Trung · NP-999', avatar: '/images/user-default.jpg' },
      online: false,
    },
  ],
  groups_default: [
    {
      user: { name: 'THÔNG BÁO TẬP ĐOÀN', avatar: '/logo-light.png' },
      online: false,
    },
    {
      user: { name: 'TRÒ CHUYỆN NPVN', avatar: '/logo-light.png' },
      online: true,
    },
    {
      user: { name: 'THÔNG BÁO NPVN', avatar: '/logo-light.png' },
      online: false,
    },
  ],
  groups: [
    {
      user: { name: 'Nhóm Chat Nhà Phố', avatar: '/images/user-default.jpg' },
      online: false,
    },
    {
      user: { name: 'Nhóm Chat 1', avatar: '/images/user-default.jpg' },
      online: true,
    },
    {
      user: { name: 'Nhóm Chat 2 Phố cổ', avatar: '/images/user-default.jpg' },
      online: false,
    },
  ],
};

const WAREHOUSE_REASON_CONTENT_SAMPLE = `
  <p><strong>Bản năng</strong> của người <strong>Môi giới</strong> thường hay chạy theo <strong>Khách hàng</strong>. Đặc biệt những <strong>Môi giới</strong> mới vào nghề hay bị <strong>khách hàng chi phối</strong></p>

  <ol style="padding-left:14px">
    <li><strong>Không lọc <strong>diện tích</strong> vì:</strong>
      <ul style="padding-left:4px">
        <li>Khách hàng thường yêu cầu tìm <strong>nhà rẻ đẹp</strong> hoặc phù hợp với tài chính của khách nhưng <strong>diện tích</strong> phải <strong>rộng</strong> hơn so với nhu cầu thực, do khách hàng chưa hiểu thị trường hoặc Khách hàng muốn Môi giới phải <strong>giải bài toán khó</strong> cho Khách. Nhưng trên <strong>thị trường thực tế</strong> thường khó đáp ứng với yêu cầu của Khách. Nếu cố thì là nhà cũ xác định bán đất, lỗi phong thủy hoặc chưa sổ... Vì vậy nếu Anh chị em lọc <strong>diện tích</strong> theo yêu cầu Khách sẽ mất cơ hội tiếp cận những căn nhà có <strong>diện tích</strong> nhỏ hơn nhưng lại rất phù hợp với các <strong>tiêu chí chính</strong> của Khách. → <strong>Mất cơ hội</strong> và nhường lại cơ hội cho <strong>Đối thủ</strong>.</li>
        <li><strong>Nguy cơ tiềm ẩn:</strong> Đối Đầu chủ khi đăng bài vì muốn Đầu khách tiếp cận tin đăng của mình nhiều hơn khi lọc Diện tích nên sẽ phải <strong>tăng khống diện tích</strong> lên để cạnh tranh. Cũng giống như việc Đầu khách đăng tin bao giờ cũng tăng diện tích lên để có Khách hàng gọi đến. Nếu thông tin không còn chính xác nữa thì sẽ tiềm ẩn rủi ro rất lớn.</li>
      </ul>
    </li>
    <li>Không lọc <strong>mặt tiền</strong> vì: cũng giống như diện tích sẽ bị bỏ qua rất nhiều căn nhà phù hợp thực sự với khách. Vì ngoài diện tích và mặt tiền còn có những tiêu chí quan trọng như Vị trí đắc địa, <strong>Kiến trúc</strong> căn nhà, <strong>Phong thủy</strong> tốt, <strong>Cư dân</strong> văn hóa, <strong>Kinh doanh</strong> tốt...</li>
    <li>Không lọc <strong>Hướng</strong> vì:
      <ul style="padding-left:4px">
        <li><strong>Nếu lọc Hướng</strong> sẽ dẫn đến tình trạng <strong>không đi Khảo sát</strong> chỉ vì căn đó Hướng không phù hợp với Khách. Cũng giống như việc tại sao Đầu Khách không đăng Hướng lên tin đăng vì chỉ tiếp cận được <strong>50% Khách hàng có hướng phù hợp</strong> với tin đăng đó. Nếu lọc Hướng cũng vậy cũng sẽ <strong>giảm 50%</strong> tiếp cận với những căn nhà đẹp phù hợp với khách chỉ vì Hướng. → <strong>Mất cơ hội</strong></li>
        <li><strong>Đầu chủ khi ký nhà</strong> có người có Hướng có người không do, vì vậy khi đăng bài có người đăng hướng, có người không đăng dẫn đến không đồng nhất được Hướng. Hoặc có Đầu chủ dựa vào số để xem hướng đăng bài, nhưng Hướng trên sổ chưa chắc đã chính xác (VD trên sổ là hướng Bắc - ĐTT nhưng khi khảo sát đo thực tế lại là Đông Bắc - TTT). Nên khi lọc sẽ không còn chính xác nữa.</li>
      </ul>
    </li>
  </ol>

  <p><strong>Kho hàng</strong> thông minh nhưng phải có <strong>chọn lọc</strong>. Càng chính xác quá sẽ càng làm giảm cơ hội.</p>
`;

const CUSTOMER_QUESTION_18 = `
  <div style="font-size:14px;">
    <ol style="padding-left:26px;display:flex;flex-direction:column;gap:5px">
      <li><strong>Anh chị tìm nhà lâu chưa?</strong></li>
      <li><strong>Anh chị ở gần khu vực này không?</strong></li>
      <li><strong>Em có mấy căn ở đây anh chị hỏi căn nhà nào?</strong> 
          <br>(Khi khách hỏi đến nhà ảo thì mình nói nhà chưa sổ hoặc đang quy hoạch để đẩy khách sang căn mình có)
      </li>
      <li><strong>Chị mua để ở hay đầu tư kinh doanh?</strong></li>
      <li><strong>Sao anh chị cần mua nhà khu vực này? Em cần biết nhu cầu của anh chị để tìm nhà sát với tiêu chí của anh chị.</strong></li>
      <li><strong>Có cần mua gấp không?</strong></li>
      <li><strong>Anh chị mua để tự kinh doanh hay cho thuê?</strong></li>
      <li><strong>Anh chị cần bao nhiêu phòng ngủ?</strong></li>
      <li><strong>Nhà có bao nhiêu người?</strong></li>
      <li><strong>Anh chị có quan trọng hướng không? Nếu có, anh chị hợp hướng gì?</strong></li>
      <li><strong>Tầm tài chính bao nhiêu?</strong></li>
      <li><strong>Mua cho ai?</strong> 
          <br>(Khách nói mua cho người khác hoặc đi xem hộ thì cho next luôn)
      </li>
      <li><strong>Mua nhà này bao nhiêu người quyết định?</strong> 
          <br>(Nếu người quyết định họ sẽ nói rõ vấn đề họ không ưng về căn nhà)
      </li>
      <li><strong>Có cần vay hay không?</strong></li>
      <li><strong>Mua trượt nhà nào chưa?</strong> 
          <br>(Nếu rồi thì họ có nhu cầu mua nhà thật và tìm hiểu căn họ mua trượt khi gặp để sát nhu cầu)
      </li>
      <li><strong>Đi xem nhà vào giờ nào?</strong> 
          <br>(Nên tránh giờ tắc đường. Không nên dẫn ngay sau cuộc gọi mà phải từ 30 phút trở lên để có thời gian khảo sát lại và tìm hiểu kỹ thông tin căn nhà khi gặp khách)
      </li>
      <li><strong>Có kiêng thóp hậu, đường đâm, ngõ cụt không?</strong> 
          <br>(Nếu khách kiêng đường đâm là họ kiêng cả thóp hậu)
      </li>
      <li><strong>Nhà cũ có được không hay nhà mới 6 tháng trở lại thì ngon hơn?</strong> 
          <br>(Nếu khách nói sao hỏ nhiều thế thì trả lời khách là em làm như vậy cũng chỉ muốn giúp anh chị mua được nhà ưng ý và khách thật họ luôn lắng nghe mình nói, còn môi giới chỉ là hỏi mấy câu rồi nhanh chóng cúp máy vì sợ tốn tiền.)
      </li>
    </ol>
  </div>
`;

const REQUIRED_MSG_SAMPLE = 'Vui lòng không bỏ trống.';

export {
  CHAT_PREVIEW_SAMPLE,
  IMAGE_SAMPLE,
  WAREHOUSE_REASON_CONTENT_SAMPLE,
  CUSTOMER_QUESTION_18,
  REQUIRED_MSG_SAMPLE,
};
