import { IChatPreview } from '@/components/chat/chat-preview';
import { PostDetailTypes } from '@/components/reuse/data-display';

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

const DEALS_FEED: PostDetailTypes = {
  id: 'id-deals',
  author: {
    name: 'Nguyễn Văn A - Hà Nội',
    avatar: '/images/post-1.jpeg',
    phone: '00987654321',
    message: '-',
  },
  content: `<p>🌹🌹🌹<b>BÙM💥BÙM💥BÙM</b>🌹🌹🌹</p>
            <p>❤️<b>THÁNG 7 VU LAN</b> ❤️</p>
            <p>❤️<b>LONG BIÊN NỞ HOA</b>❤️</p>
            <p>💶💶 <b>CHỐT NHÀ NỬA TRIỆU ĐÔ</b> 💶💶</p>
            <p>🔥🥰NHÀ PHỐ 698 ( LIÊN MINH SIÊU CHỐT 698-385-3333-6888) YÊU THƯƠNG NP 3968🥰🔥</p>
            <p>🧨 Kính thưa Chủ tịch, Kính thưa Tổng Giám đốc và các Giám Đốc, Phó Giám Đốc, Trưởng Phòng, cùng toàn thể anh chị em Tập đoàn Nhà Phố Việt Nam.</p>
            <p>Tôi, GĐKD Tuấn Hùng - Nhà Phố 698 vui mừng thông báo vụ Chốt thành công 1 em siêu phẩm đâu đó tại Long Biên của phu thê PP CNLB Nguyễn Hùng - Trịnh Thủy NP 698 trên cương vị đầu khách cùng Đầu chủ Viết Tuân Nhà Phố 3968, đã cùng nhau phối hợp ăn ý, cùng nhau hạ gục em siêu phẩm đâu đó tại Long Biên.</p>
            <p>🤝Chúc mừng phu thê PP CNLB Nguyễn Hùng - Trịnh Thủy chiến thần siêu chốt. Phu thê PP Nguyễn Hùng- Trịnh Thuỷ vừa hoạt động sôi nổi ký nhiều siêu phẩm về công ty mà còn giỏi trên cương vị Đầu khách đã cùng Đầu chủ Viết Tuân chốt hạ siêu phẩm đâu đó tại Long Biên.</p>
            <p>🌹 Thay mặt Trưởng phòng Hoàng Nhung Nhà Phố 3968, Đầu chủ Viết Tuân Nhà Phố 3968 cùng ACE NP 698, Cảm ơn Lãnh đạo Tập Đoàn Nhà Phố Việt Nam.</p>
            <p>🤝 Cảm ơn Chủ tịch và Tổng Giám Đốc và Tập Đoàn Nhà Phố Việt Nam.</p>
            <p>🤝 Cảm ơn ĐC Viết Tuân.</p>
            <p>Chúc ACE Nhà Phố Việt Nam đăng nhiều tin, dẫn nhiều khách - <b>CHỐT NHÀ RỰC RỠ, LIÊN HOÀN CHỐT NHÀ TRIỆU ĐÔ, NHIỀU TRIỆU ĐÔ</b>.💥💥💥🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹</p>
            <p>Trân Trọng cảm ơn 🌹🌹🌹🌹🌹🌹</p>
            <p><b>GĐCNLB - TUẤN HÙNG - NHÀ PHỐ 698</b>.</p>
            `,
  images: [
    '/images/post-1.jpeg',
    '/images/post-2.jpeg',
    '/images/post-3.jpeg',
    '/images/post-4.jpeg',
    '/images/banner.png',
    '/images/post-6.jpeg',
  ],
  tags: ['nguyen-van-a', 'deals', 'test'],
  view_count: 73242,
  like_count: 2552,
  created_at: new Date('2023-10-11').toISOString(),
  updated_at: new Date('2023-10-11').toISOString(),
};
const URGENTLY_FEED: PostDetailTypes = {
  id: 'id-urgently',
  author: {
    name: 'Trần Thị B - Đà Nẵng',
    avatar: '/images/post-2.jpeg',
    phone: '0098768283',
    message: '-',
  },
  content: `
            <p>Tôi có khách cần mua gấp, kính nhờ anh chị em tìm hộ giúp tôi. Tiêu chí khách:</p>
            <p><b>Khu vực:</b> Hà Nội</p>
            <p><b>Quận:</b> Cầu Giấy, Tây Hồ</p>
            <p><b>Tài chính:</b> 10 tỷ</p>
            <p><b>Diện tích:</b> 40m2</p>
            <p><b>Mục đích:</b> Để ở</p>
            <p><b>Yêu cầu:</b> Ngõ ô tô</p>`,
  tags: ['tran-thi-b', 'urgently', 'test'],
  view_count: 42425,
  like_count: 5252,
  created_at: new Date('2024-09-11').toISOString(),
  updated_at: new Date('2024-09-11').toISOString(),
};
const SKILL_FEED: PostDetailTypes = {
  id: 'id-skill',
  author: {
    name: 'Đặng Thị C - Hồ Chí Minh',
    avatar: '/images/post-3.jpeg',
    phone: '0098768242',
    message: '-',
  },
  content: `<p><b>Đây là feed của Đặng Thị C</p></b>
            <p>Chia sẻ kỹ năng</p>
            <p><strong>1. HỢP ĐỒNG ĐẶT CỌC 2024</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=1RcIuBXCPR5cNgwrqvfQ1O7cHi9gAJpXK" target="_blank">https://drive.google.com/uc?export=view&id=1RcIuBXCPR5cNgwrqvfQ1O7cHi9gAJpXK</a></p>
            <p><strong>2. HỢP ĐỒNG TRÍCH THƯỞNG 2024</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=151ZYxjq4ebtZVkPvKmx3BanI0zmVGMeU" target="_blank">https://drive.google.com/uc?export=view&id=151ZYxjq4ebtZVkPvKmx3BanI0zmVGMeU</a></p>
            <p><strong>3. PHIẾU YÊU CẦU CUNG CẤP DỊCH VỤ 2024</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=17Q_uEDGjjdRj5VpOI_hbISlCATJjnfrQ" target="_blank">https://drive.google.com/uc?export=view&id=17Q_uEDGjjdRj5VpOI_hbISlCATJjnfrQ</a></p>
            <p><strong>4. BIÊN BẢN SỰ VỤ</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=14dIse1VomGw6eZWbKcMjTtHRdSNoftXe" target="_blank">https://drive.google.com/uc?export=view&id=14dIse1VomGw6eZWbKcMjTtHRdSNoftXe</a></p>
            <p><strong>5. BIÊN BẢN XÁC NHẬN GIẢM HOA HỒNG</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=1jQsmqsLQ3s2Q4EIHZohg1fz7KAdElaEP" target="_blank">https://drive.google.com/uc?export=view&id=1jQsmqsLQ3s2Q4EIHZohg1fz7KAdElaEP</a></p>
            <p><strong>6. BIÊN BẢN XÁC NHẬN HOA HỒNG</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=1f3hlxR0Y16GvFd0IFb0YbbnS7eyFuVIk" target="_blank">https://drive.google.com/uc?export=view&id=1f3hlxR0Y16GvFd0IFb0YbbnS7eyFuVIk</a></p>
            <p><strong>7. BIÊN BẢN XÁC NHẬN HOÀN TRẢ PHÍ MÔI GIỚI</strong></p>
            <p><a href="https://drive.google.com/uc?export=view&id=1LLdfQi5vDhAQD80qviYhk1giKRx-NTPW" target="_blank">https://drive.google.com/uc?export=view&id=1LLdfQi5vDhAQD80qviYhk1giKRx-NTPW</a></p>`,
  tags: ['dang-thi-c', 'skill', 'test'],
  view_count: 563,
  like_count: 44,
  created_at: new Date('2024-10-11').toISOString(),
  updated_at: new Date('2024-10-11').toISOString(),
};
const FEEDS_DEMO = {
  deals: DEALS_FEED,
  urgently: URGENTLY_FEED,
  skill: SKILL_FEED,
};
export {
  CHAT_PREVIEW_SAMPLE,
  CUSTOMER_QUESTION_18,
  FEEDS_DEMO,
  IMAGE_SAMPLE,
  REQUIRED_MSG_SAMPLE,
  WAREHOUSE_REASON_CONTENT_SAMPLE,
};
