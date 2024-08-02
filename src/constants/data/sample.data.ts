import { IChatPreview } from '@/components/chat/chat-preview';

const IMAGE_SAMPLE =
  'https://s3-alpha-sig.figma.com/img/206c/4897/28b7b0c60958131808a8471ce60ce66c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gou9Y9BF1LpeSzG0pfVuHFV7cgEyhhTWF3BGDmhfKJ9KQFujWYps9njFX9DX0BamSqCgV92IREejdMdq0MY9~-NBeWahRP84U69HbHtLEUhZ~GctgjBlFU16rU5N~M~IYYYacM42WQl3zP2cbTJs2jk6uTJLgUacIZn5tZnw3XEl4GI3FW6TycihjEGQOoqh30bfb2hXnWa9DrZRanN2EBeyYbfsnmXFt11RYXq0WowpD1dhKr3NaUFAFDH6QOYD4muQyAGHcbf8W44pNKmObG6kR7j6uaiMYQ-GIeuiGaoeXFMwdj2RjWzHB2zFKKuPtsH56LpJaZyhlweEXz9rxQ__';

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

const REQUIRED_MSG_SAMPLE = 'Vui lòng không bỏ trống.';

export { CHAT_PREVIEW_SAMPLE, IMAGE_SAMPLE, WAREHOUSE_REASON_CONTENT_SAMPLE, REQUIRED_MSG_SAMPLE };
