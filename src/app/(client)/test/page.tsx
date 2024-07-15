import PostDetail from '@/components/reuse/data-display/post';

function page() {
  return (
    <div className="ms-[300px] mt-[60px] p-6 bg-gray-400">
      <div className="flex gap-5">
        <PostDetail
          post={{
            content: `
           <p><strong class="font-semibold">THÔNG BÁO: Quy trình bắt buộc trải qua 4 buổi đào tạo đối với thành viên đi ký nhà đang làm việc tại Nhà Phố Hồ Chí Minh.</strong></p><p><br></p><p>1. Thành viên đi ký nhà bao gồm: GĐ, TP, UVTP, PP, ĐC gọi tắt là Bộ phận Đầu chủ (ĐC).</p><p><br></p><p>2. Tham gia đầy đủ <strong class="font-semibold">không được vắng mặt 4 buổi đào tạo</strong> của Nhà Phố Hồ Chí Minh.</p><p><br></p><p>3. Thời gian học: Thứ 6, thứ 7 (ngày 14,15 tháng 6).</p><p>+ <strong class="font-semibold">Buổi sáng: Từ 8:30 đến khi xong.</strong></p><p>+ <strong class="font-semibold">Buổi chiều: Từ 13:30 đến khi xong.</strong></p><p><br></p><p>4. Đào tạo gia đứng lớp:</p><p>- <strong class="font-semibold">GĐĐT Nguyễn Chính Phương – GĐKD NPHN22</strong>: Đào tạo gia có bề dày hơn 20 năm kinh nghiệm trong nghề và thành công với rất nhiều thương vụ chốt Triệu đô.</p><p>- <strong class="font-semibold">GĐKD NPHN1881 Nguyễn Tiến Dũng – GĐCN Bắc Từ Liêm</strong>: Luật sư có nhiều năm kinh nghiệm ở lĩnh vực Pháp lý trong giao dịch Bất động sản.</p><p><br></p><p>5. ĐC chuẩn bị: Sổ bút ghi chép; tuyệt đối đúng giờ.</p><p><br></p><p>6. Thời gian điểm danh: <strong class="font-semibold">15 phút đầu giờ</strong>.</p><p><br></p><p>7. Sau mỗi buổi đào tạo, từng ĐC sẽ ở lại ký điểm danh và nhận bộ câu hỏi sát hạch (mang về nhà làm).</p><p><br></p><p>8. ĐC phải hoàn thiện và nộp đủ 4 bộ câu hỏi sát hạch của 4 buổi đào tạo tới Ban Đào tạo.</p><p><br></p><p>9. Thời hạn nộp bài: Trong vòng 5 ngày kể từ ngày nhận bộ câu hỏi sát hạch.</p><p>- Ban Đào tạo sẽ chấm theo <strong class="font-semibold">thang điểm: 10.</strong></p><p>- Bài nào bị <strong class="font-semibold">điểm &lt;5</strong> thì Công ty sẽ tạm dừng duyệt bài ký nhà đưa lên kho Nhà Phố của ĐC đó.</p><p>- ĐC phải <strong class="font-semibold">học lại</strong> hoặc <strong class="font-semibold">làm lại</strong> bài sát hạch đó cho đến khi đạt thang điểm đủ điều kiện được duyệt nguồn nhà trên kho.</p><p><br></p><p><strong class="font-semibold">LƯU Ý: Để làm được bài sát hạch đạt yêu cầu đủ thang điểm tiêu chuẩn, ĐC phải ghi chép đầy đủ và trọn vẹn xuyên suốt 4 buổi đào tạo.</strong></p>`,
            images: [
              '/images/post-1.jpeg',
              '/images/post-2.jpeg',
              '/images/post-3.jpeg',
              '/images/post-4.jpeg',
              '/images/post-5.jpeg',
              // '/images/post-6.jpeg',
            ],
          }}
        ></PostDetail>
      </div>
    </div>
  );
}

export default page;
