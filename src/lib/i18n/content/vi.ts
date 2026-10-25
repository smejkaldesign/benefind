import type { ContentMessages } from "../localize-content";

export const vi: ContentMessages = {
  comparisons: {
    "snap-vs-wic": {
      title: "SNAP và WIC: Chương trình hỗ trợ thực phẩm nào phù hợp với bạn?",
      description:
        "SNAP và WIC đều là chương trình hỗ trợ thực phẩm của liên bang, nhưng cách hoạt động rất khác nhau. Khi hiểu rõ các điểm khác nhau chính, bạn sẽ nộp đơn đúng chương trình, hoặc nộp cả hai.",
      programA: {
        name: "SNAP",
        tagline:
          "Hỗ trợ mua thực phẩm rộng rãi cho các hộ gia đình có thu nhập thấp",
        dimensions: [
          {
            label: "Ai đủ điều kiện",
            a: "Phần lớn các hộ có thu nhập dưới 130% FPL (mức chuẩn nghèo liên bang)",
            b: "",
          },
          {
            label: "Hình thức trợ cấp",
            a: "Một số tiền hằng tháng được nạp vào thẻ EBT",
            b: "",
          },
          {
            label: "Bạn có thể mua gì",
            a: "Hầu hết các loại thực phẩm tại cửa hàng được chấp thuận",
            b: "",
          },
          {
            label: "Yêu cầu về tuổi",
            a: "Không giới hạn tuổi, cả hộ gia đình đều được hỗ trợ",
            b: "",
          },
          {
            label: "Giới hạn thu nhập (gia đình 4 người)",
            a: "Khoảng $3,381/tháng trước thuế (2026)",
            b: "",
          },
          {
            label: "Cách nộp đơn",
            a: "Nộp đơn tại văn phòng SNAP của tiểu bang hoặc trực tuyến",
            b: "",
          },
        ],
      },
      programB: {
        name: "WIC",
        tagline:
          "Hỗ trợ dinh dưỡng dành riêng cho phụ nữ, trẻ sơ sinh và trẻ em",
        dimensions: [
          {
            label: "Ai đủ điều kiện",
            a: "",
            b: "Phụ nữ mang thai hoặc mới sinh con, trẻ sơ sinh, trẻ em dưới 5 tuổi",
          },
          {
            label: "Hình thức trợ cấp",
            a: "",
            b: "Phiếu hoặc thẻ EBT để mua một số thực phẩm được chấp thuận",
          },
          {
            label: "Bạn có thể mua gì",
            a: "",
            b: "Một danh sách cố định: sữa, trứng, ngũ cốc, rau quả, sữa công thức",
          },
          {
            label: "Yêu cầu về tuổi",
            a: "",
            b: "Trẻ em phải dưới 5 tuổi; phụ nữ trong và sau khi mang thai",
          },
          {
            label: "Giới hạn thu nhập (gia đình 4 người)",
            a: "",
            b: "Khoảng $3,868/tháng trước thuế (185% FPL)",
          },
          {
            label: "Cách nộp đơn",
            a: "",
            b: "Nộp đơn tại phòng khám WIC hoặc sở y tế địa phương",
          },
        ],
      },
      verdict:
        "Nếu có thể, hãy nộp đơn cả hai. Hai chương trình đáp ứng các nhu cầu khác nhau.",
      verdictDetail:
        "SNAP cho bạn tự do mua gần như mọi loại thực phẩm, nhưng số tiền cho mỗi người thấp hơn. WIC mang lại giá trị cao hơn cho mỗi đô la đối với các thực phẩm mà chương trình chi trả, và có giới hạn thu nhập cao hơn một chút. Nếu bạn có con dưới 5 tuổi hoặc đang mang thai, hãy nộp đơn WIC trước, vì giới hạn thu nhập cao hơn và bạn nhận trợ cấp ngay. Sau đó, hãy nộp đơn SNAP nếu thu nhập của hộ gia đình bạn thấp hơn mức của SNAP.",
      faqs: [
        {
          q: "Tôi có thể dùng cả SNAP và WIC cùng lúc không?",
          a: "Có. SNAP và WIC là hai chương trình hoàn toàn riêng biệt với hai đơn riêng. Nhiều gia đình nhận cả hai cùng lúc. WIC dành cho một số thực phẩm cụ thể, còn SNAP dùng để mua thực phẩm nói chung.",
        },
        {
          q: "Chương trình nào cho nhiều tiền hơn?",
          a: "Điều này tùy vào số người và thành phần của hộ gia đình. Trợ cấp SNAP trung bình khoảng $230/tháng cho mỗi hộ, và tăng theo số người trong hộ. WIC cung cấp một gói thực phẩm cố định, trị giá khoảng $50–100/tháng tùy vào phần bạn đủ điều kiện nhận.",
        },
        {
          q: "WIC có yêu cầu phải đi làm không?",
          a: "Không. WIC không có yêu cầu đi làm. SNAP có yêu cầu đi làm đối với người lớn có sức khỏe, không có người phụ thuộc (ABAWD), từ 18–54 tuổi, nhưng nhiều tiểu bang được miễn yêu cầu này.",
        },
      ],
    },
    "medicaid-vs-marketplace": {
      title: "Medicaid và ACA Marketplace: Bạn nên chọn bảo hiểm sức khỏe nào?",
      description:
        "Nếu bạn không có bảo hiểm hoặc vừa mất bảo hiểm từ chỗ làm, bạn có hai cách chính để có bảo hiểm sức khỏe giá phải chăng. Lựa chọn đúng tùy vào thu nhập và nơi bạn sống.",
      programA: {
        name: "Medicaid",
        tagline:
          "Bảo hiểm miễn phí hoặc gần như miễn phí cho người có thu nhập thấp",
        dimensions: [
          {
            label: "Mức thu nhập",
            a: "Tối đa khoảng 138% FPL ở các tiểu bang đã mở rộng Medicaid",
            b: "",
          },
          {
            label: "Phí bảo hiểm hằng tháng",
            a: "$0 trong hầu hết trường hợp",
            b: "",
          },
          { label: "Khoản khấu trừ", a: "Không có hoặc rất thấp", b: "" },
          {
            label: "Thời gian ghi danh",
            a: "Mở cả năm, nộp đơn bất cứ lúc nào",
            b: "",
          },
          {
            label: "Nha khoa/thị lực",
            a: "Thường có cho người lớn ở các tiểu bang đã mở rộng",
            b: "",
          },
          {
            label: "Mạng lưới bác sĩ",
            a: "Khác nhau; có thể hạn chế hơn",
            b: "",
          },
        ],
      },
      programB: {
        name: "ACA Marketplace",
        tagline:
          "Bảo hiểm tư nhân được trợ giá cho người có thu nhập trung bình",
        dimensions: [
          {
            label: "Mức thu nhập",
            a: "",
            b: "100–400% FPL (có trợ giá)",
          },
          {
            label: "Phí bảo hiểm hằng tháng",
            a: "",
            b: "Sau trợ giá: thường $0–$50/tháng",
          },
          {
            label: "Khoản khấu trừ",
            a: "",
            b: "Thường $500–$3,000 tùy vào hạng gói bảo hiểm",
          },
          {
            label: "Thời gian ghi danh",
            a: "",
            b: "Từ 1/11 đến 15/1, hoặc khi có sự kiện đủ điều kiện trong đời sống",
          },
          {
            label: "Nha khoa/thị lực",
            a: "",
            b: "Gói riêng; không nằm trong bảo hiểm sức khỏe",
          },
          {
            label: "Mạng lưới bác sĩ",
            a: "",
            b: "Có các lựa chọn mạng lưới lớn hơn",
          },
        ],
      },
      verdict:
        "Nếu thu nhập của bạn dưới 138% FPL, Medicaid gần như luôn là lựa chọn tốt hơn.",
      verdictDetail:
        "Medicaid miễn phí, chi trả nhiều dịch vụ hơn, và bạn có thể ghi danh bất cứ lúc nào trong năm. Nếu thu nhập của bạn cao hơn mức của Medicaid (hoặc bạn sống ở tiểu bang chưa mở rộng Medicaid), ACA Marketplace với tín thuế phí bảo hiểm là lựa chọn tốt nhất. Hãy kiểm tra xem tiểu bang của bạn đã mở rộng Medicaid chưa. Đã có 40 tiểu bang mở rộng. Nếu thu nhập của bạn gần mức giới hạn, hãy tính thử cả hai cách tại healthcare.gov.",
      faqs: [
        {
          q: "Nếu thu nhập của tôi quá cao để nhận Medicaid nhưng tôi không đủ tiền mua gói Marketplace thì sao?",
          a: "Tín thuế phí bảo hiểm tăng cường từ Đạo luật Giảm Lạm phát (Inflation Reduction Act) đã giảm đáng kể phí bảo hiểm Marketplace. Nhiều người có thu nhập 200–300% FPL trả $0 hoặc rất ít mỗi tháng. Hãy dùng công cụ tính trên Healthcare.gov để xem chi phí thực tế của bạn trước khi quyết định.",
        },
        {
          q: "Tôi có thể chuyển từ Medicaid sang Marketplace nếu thu nhập thay đổi không?",
          a: "Có. Thay đổi thu nhập là một sự kiện đủ điều kiện để ghi danh đặc biệt. Nếu thu nhập của bạn tăng cao hơn mức của Medicaid, bạn có 60 ngày để ghi danh vào một gói Marketplace.",
        },
        {
          q: "Medicaid có chi trả thuốc theo toa không?",
          a: "Có. Tất cả các chương trình Medicaid đều chi trả thuốc theo toa, nhưng danh mục thuốc khác nhau theo tiểu bang. Các gói Marketplace cũng chi trả thuốc theo toa, nhưng phần chi phí bạn phải trả khác nhau nhiều tùy vào hạng gói.",
        },
      ],
    },
    "section-8-vs-public-housing": {
      title: "Section 8 và Nhà ở Công cộng: Khác nhau thế nào?",
      description:
        "Cả hai chương trình đều giúp các gia đình thu nhập thấp có nhà ở với giá phải chăng, nhưng cách hoạt động hoàn toàn khác nhau. Khi hiểu điểm khác nhau, bạn sẽ biết nên nộp đơn ở đâu.",
      programA: {
        name: "Section 8 (Phiếu Lựa chọn Nhà ở)",
        tagline: "Phiếu hỗ trợ có thể mang theo, dùng để thuê nhà tư nhân",
        dimensions: [
          {
            label: "Cách hoạt động",
            a: "Tiền từ phiếu được trả thẳng cho chủ nhà tư nhân",
            b: "",
          },
          {
            label: "Lựa chọn nhà ở",
            a: "Thuê bất kỳ căn nhà tư nhân nào đủ tiêu chuẩn",
            b: "",
          },
          {
            label: "Mang theo khi chuyển nhà",
            a: "Có thể chuyển sang tiểu bang khác mà vẫn giữ phiếu",
            b: "",
          },
          {
            label: "Thời gian chờ",
            a: "Từ 1 đến hơn 10 năm; nhiều danh sách chờ đã đóng",
            b: "",
          },
          {
            label: "Phần tiền thuê bạn trả",
            a: "Bạn trả khoảng 30% thu nhập đã điều chỉnh",
            b: "",
          },
          {
            label: "Cơ quan quản lý",
            a: "Cơ quan Nhà ở Công cộng địa phương (PHA)",
            b: "",
          },
        ],
      },
      programB: {
        name: "Nhà ở Công cộng",
        tagline:
          "Căn hộ thuộc sở hữu chính phủ, do cơ quan nhà ở địa phương quản lý",
        dimensions: [
          {
            label: "Cách hoạt động",
            a: "",
            b: "Bạn sống trong một căn nhà thuộc sở hữu chính phủ",
          },
          {
            label: "Lựa chọn nhà ở",
            a: "",
            b: "Chỉ được chọn trong số các căn hộ nhà ở công cộng",
          },
          {
            label: "Mang theo khi chuyển nhà",
            a: "",
            b: "Không mang theo được, gắn với một khu nhà cụ thể",
          },
          {
            label: "Thời gian chờ",
            a: "",
            b: "Từ 1 đến hơn 5 năm; số chỗ trống khác nhau theo thành phố",
          },
          {
            label: "Phần tiền thuê bạn trả",
            a: "",
            b: "Bạn trả khoảng 30% thu nhập đã điều chỉnh",
          },
          {
            label: "Cơ quan quản lý",
            a: "",
            b: "Cơ quan Nhà ở Công cộng địa phương (PHA)",
          },
        ],
      },
      verdict:
        "Hãy nộp đơn cả hai qua PHA địa phương. Ở hầu hết các nơi, đây là cùng một đơn.",
      verdictDetail:
        "Phiếu Section 8 cho bạn nhiều lựa chọn và linh hoạt hơn: bạn có thể thuê hầu hết các căn hộ tư nhân và thậm chí chuyển sang thành phố khác. Nhà ở công cộng thường có nhanh hơn (ở nơi còn chỗ), nhưng bạn phải ở trong một khu nhà cụ thể. Ở hầu hết các thành phố, bạn nộp đơn cả hai cùng lúc qua Cơ quan Nhà ở Công cộng địa phương. Vì thời gian chờ của cả hai đều dài, bạn cần nộp đơn càng sớm càng tốt.",
      faqs: [
        {
          q: "Tôi có thể dùng phiếu Section 8 để mua nhà không?",
          a: "Có. Chương trình Phiếu Sở hữu Nhà (còn gọi là HCV Homeownership) cho phép các gia đình đủ điều kiện dùng phiếu để trả tiền vay mua nhà thay vì trả tiền thuê. Bạn phải đáp ứng các yêu cầu về thu nhập, việc làm và là người mua nhà lần đầu.",
        },
        {
          q: "Thu nhập bao nhiêu thì đủ điều kiện nhận Section 8?",
          a: "Thu nhập của bạn phải bằng hoặc thấp hơn 50% Thu nhập Trung bình của Khu vực (AMI) nơi bạn sống. Ít nhất 75% số phiếu phải dành cho các gia đình có thu nhập bằng hoặc thấp hơn 30% AMI. Giới hạn thu nhập khác nhau nhiều theo thành phố.",
        },
        {
          q: "Làm sao để được ra khỏi danh sách chờ nhanh hơn?",
          a: "Hãy nộp đơn ở nhiều PHA cùng lúc, vì thời gian chờ khác nhau nhiều theo từng nơi. Hãy chú ý các đợt mở nhận đơn. Các nhóm được ưu tiên (cựu quân nhân, người khuyết tật, gia đình vô gia cư) có thể được xếp lên trước trong danh sách.",
        },
      ],
    },
    "rd-credit-vs-sbir": {
      title:
        "Tín thuế R&D và Trợ cấp SBIR: Doanh nghiệp của bạn nên chọn cái nào?",
      description:
        "Các doanh nghiệp nhỏ đầu tư vào nghiên cứu và phát triển có hai chương trình khuyến khích lớn của liên bang. Hai chương trình có mục đích khác nhau và thường có thể dùng cùng nhau.",
      programA: {
        name: "Tín thuế R&D (Section 41)",
        tagline:
          "Tín thuế cố định cho chi phí nghiên cứu và thử nghiệm đủ điều kiện",
        dimensions: [
          {
            label: "Loại",
            a: "Tín thuế trừ vào thuế thu nhập hoặc thuế lương",
            b: "",
          },
          {
            label: "Số tiền",
            a: "14% QRE (chi phí nghiên cứu đủ điều kiện) vượt mức cơ sở (phương pháp ASC); 20% theo phương pháp thông thường",
            b: "",
          },
          {
            label: "Ai đủ điều kiện",
            a: "Bất kỳ doanh nghiệp nào có hoạt động R&D đủ điều kiện",
            b: "",
          },
          {
            label: "Cách nộp đơn",
            a: "Khai trong tờ khai thuế hằng năm",
            b: "",
          },
          {
            label: "Tiền mặt nhận trước",
            a: "Không. Tín thuế giảm số thuế phải trả, hoặc được chuyển sang các năm sau",
            b: "",
          },
          {
            label: "Quyền sở hữu trí tuệ",
            a: "Có. Bạn sở hữu toàn bộ tài sản trí tuệ tạo ra",
            b: "",
          },
        ],
      },
      programB: {
        name: "Trợ cấp SBIR",
        tagline:
          "Trợ cấp liên bang có cạnh tranh cho doanh nghiệp nhỏ làm R&D đổi mới",
        dimensions: [
          {
            label: "Loại",
            a: "",
            b: "Trợ cấp trực tiếp (Giai đoạn I: khoảng $275K; Giai đoạn II: khoảng $1.85M)",
          },
          {
            label: "Số tiền",
            a: "",
            b: "Giai đoạn I: tối đa $275,000; Giai đoạn II: tối đa $1.85M",
          },
          {
            label: "Ai đủ điều kiện",
            a: "",
            b: "Doanh nghiệp nhỏ tại Mỹ có dưới 500 nhân viên",
          },
          {
            label: "Cách nộp đơn",
            a: "",
            b: "Nộp đề xuất cạnh tranh cho các cơ quan liên bang",
          },
          {
            label: "Tiền mặt nhận trước",
            a: "",
            b: "Có. Tiền mặt được chi trực tiếp cho doanh nghiệp của bạn",
          },
          {
            label: "Quyền sở hữu trí tuệ",
            a: "",
            b: "Có. Bạn giữ quyền sở hữu tài sản trí tuệ tạo ra",
          },
        ],
      },
      verdict:
        "Hãy theo đuổi cả hai. Bạn có thể dùng cả hai cùng lúc, và mỗi chương trình đáp ứng một nhu cầu dòng tiền khác nhau.",
      verdictDetail:
        "Tín thuế R&D dành cho gần như mọi doanh nghiệp làm nghiên cứu đủ điều kiện, như phần mềm, sản xuất, công nghệ sinh học và nhiều ngành khác. Đây không phải tiền mặt nhận trước, nhưng tín thuế giảm số thuế bạn phải trả ngay hoặc được chuyển sang các năm sau. SBIR có cạnh tranh và mất nhiều tháng, nhưng cho bạn tiền mặt thật để trả cho nghiên cứu mà bạn không đủ khả năng chi trả. Các công ty khởi nghiệp thường dùng SBIR để trả cho R&D giai đoạn đầu, rồi khai tín thuế R&D cho các chi phí còn lại. Bạn có thể dùng cả hai trong cùng một năm.",
      faqs: [
        {
          q: "Công ty khởi nghiệp chưa có lợi nhuận có thể dùng tín thuế R&D không?",
          a: "Có. Doanh nghiệp Nhỏ Đủ điều kiện (QSB), tức là công ty có tổng doanh thu dưới $5M và có doanh thu không quá 5 năm, có thể dùng tối đa $500,000 tín thuế R&D để trừ vào thuế lương thay vì thuế thu nhập.",
        },
        {
          q: "Trợ cấp SBIR cạnh tranh đến mức nào?",
          a: "Tỷ lệ được chấp thuận khác nhau theo cơ quan và lĩnh vực, nhưng thường từ 10–25% cho Giai đoạn I. Tỷ lệ được chấp thuận Giai đoạn II cho những người đã nhận Giai đoạn I cao hơn, thường 40–60%. Khả năng đưa sản phẩm ra thị trường cũng quan trọng như giá trị kỹ thuật.",
        },
        {
          q: "Tôi có thể khai tín thuế R&D cho cùng các chi phí đã được SBIR chi trả không?",
          a: "Không. Bạn không thể khai tín thuế R&D cho các chi phí đã trả bằng tiền SBIR. Bạn có thể khai tín thuế cho các chi phí R&D trả bằng tiền của chính bạn trong cùng năm bạn nhận trợ cấp SBIR.",
        },
      ],
    },
  },
  situations: {
    veterans: {
      title: "Phúc lợi cho Cựu Quân nhân",
      hero: "Bạn đã phục vụ đất nước. Bạn có quyền nhận nhiều hơn bạn nghĩ.",
      description:
        "Cựu quân nhân và gia đình thường đủ điều kiện nhận nhiều phúc lợi của liên bang và tiểu bang, từ chăm sóc sức khỏe, hỗ trợ nhà ở đến hỗ trợ học phí. Nhiều phúc lợi không được nhận vì hệ thống khó tìm hiểu. Benefind giúp bạn tìm tất cả các phúc lợi bạn có quyền nhận.",
      programs: [
        {
          name: "Chăm sóc Sức khỏe VA",
          summary:
            "Chăm sóc sức khỏe miễn phí hoặc chi phí thấp tại các trung tâm y tế và phòng khám của VA (Bộ Cựu chiến binh).",
          eligibilityHint:
            "Phần lớn cựu quân nhân giải ngũ danh dự đều đủ điều kiện.",
        },
        {
          name: "Bồi thường Khuyết tật VA",
          summary:
            "Tiền trả hằng tháng, miễn thuế, cho khuyết tật liên quan đến thời gian phục vụ.",
          eligibilityHint:
            "Cần có mức đánh giá khuyết tật liên quan đến phục vụ từ VA.",
        },
        {
          name: "GI Bill (Sau 11/9)",
          summary: "Tiền học phí, nhà ở và sách cho bậc đại học và cao hơn.",
          eligibilityHint: "Từ 90 ngày tại ngũ trở lên sau ngày 10/9/2001.",
        },
        {
          name: "Section 8 (HCV)",
          summary:
            "Phiếu hỗ trợ tiền thuê nhà, trả phần chênh lệch giữa tiền thuê và thu nhập.",
          eligibilityHint:
            "Thu nhập bằng hoặc thấp hơn 50% thu nhập trung bình của khu vực.",
        },
        {
          name: "SNAP",
          summary: "Tiền mua thực phẩm hằng tháng được nạp vào thẻ EBT.",
          eligibilityHint:
            "Tổng thu nhập bằng hoặc thấp hơn 130% mức chuẩn nghèo liên bang.",
        },
        {
          name: "Medicaid",
          summary:
            "Bảo hiểm sức khỏe miễn phí hoặc chi phí thấp cho cá nhân và gia đình đủ điều kiện.",
          eligibilityHint:
            "Mức thu nhập và số người trong hộ khác nhau theo tiểu bang.",
        },
        {
          name: "SSI",
          summary:
            "Tiền mặt hằng tháng cho cựu quân nhân khuyết tật hoặc cao tuổi có thu nhập thấp.",
          eligibilityHint: "Tài sản được tính dưới $2,000; thu nhập thấp.",
        },
      ],
      faqs: [
        {
          q: "Cựu quân nhân có tự động được nhận chăm sóc sức khỏe VA không?",
          a: "Không tự động. Bạn cần nộp đơn và đáp ứng các tiêu chí, bao gồm loại giải ngũ và thời gian phục vụ. Phần lớn cựu quân nhân giải ngũ danh dự đều đủ điều kiện, nhưng thứ tự ưu tiên được xếp theo nhóm, dựa trên mức khuyết tật và thu nhập.",
        },
        {
          q: "Cựu quân nhân có thể dùng cả phúc lợi VA và Medicaid không?",
          a: "Có. Chăm sóc sức khỏe VA và Medicaid là hai chương trình riêng. Nhiều cựu quân nhân dùng VA cho các vấn đề sức khỏe liên quan đến phục vụ và dùng Medicaid cho các nhu cầu sức khỏe khác. Điều kiện của mỗi chương trình được xét riêng.",
        },
        {
          q: "GI Bill có phải chỉ dành cho đại học không?",
          a: "Không. Phúc lợi GI Bill sau 11/9 có thể dùng cho chương trình đại học và sau đại học, đào tạo nghề, đào tạo tại nơi làm việc, học việc và đào tạo bay. Trong một số trường hợp, phúc lợi cũng có thể chuyển cho người phụ thuộc.",
        },
        {
          q: "Tiền khuyết tật VA có phải đóng thuế không?",
          a: "Không. Tiền bồi thường khuyết tật VA được miễn thuế cả ở cấp liên bang và tiểu bang.",
        },
      ],
    },
    students: {
      title: "Phúc lợi cho Sinh viên",
      hero: "Học đại học không nên lấy hết mọi thứ bạn có.",
      description:
        "Học phí, tiền nhà và tiền ăn tạo áp lực tài chính lớn cho sinh viên. Nhiều chương trình của liên bang và tiểu bang được lập ra để giảm áp lực này. Bạn có thể đủ điều kiện nhận nhiều hơn chỉ hỗ trợ tài chính học tập.",
      programs: [
        {
          name: "Pell Grant",
          summary: "Trợ cấp liên bang tối đa $7,395/năm, không cần hoàn trả.",
          eligibilityHint:
            "Dựa trên Mức Đóng góp Dự kiến của Gia đình từ đơn FAFSA.",
        },
        {
          name: "SNAP",
          summary:
            "Tiền mua thực phẩm hằng tháng. Một số sinh viên đủ điều kiện nếu đi làm hoặc có người phụ thuộc.",
          eligibilityHint:
            "Phải làm việc từ 20 giờ/tuần trở lên hoặc thuộc trường hợp được miễn.",
        },
        {
          name: "Medicaid / CHIP",
          summary:
            "Bảo hiểm sức khỏe miễn phí hoặc chi phí thấp dựa trên thu nhập.",
          eligibilityHint:
            "Nhiều sinh viên toàn thời gian đủ điều kiện dựa trên thu nhập của chính mình.",
        },
        {
          name: "LIHEAP",
          summary:
            "Hỗ trợ trả hóa đơn điện, gas, gồm sưởi ấm, làm mát và các trường hợp khẩn cấp về năng lượng.",
          eligibilityHint:
            "Thu nhập bằng hoặc thấp hơn 150% mức chuẩn nghèo liên bang.",
        },
        {
          name: "Work-Study",
          summary:
            "Việc làm bán thời gian do chính phủ liên bang trả lương, qua trường của bạn.",
          eligibilityHint: "Xét theo nhu cầu tài chính qua đơn FAFSA.",
        },
        {
          name: "Trợ cấp Học phí Tiểu bang",
          summary:
            "Trợ cấp riêng của từng tiểu bang, bổ sung cho hỗ trợ liên bang.",
          eligibilityHint:
            "Khác nhau theo tiểu bang. Hãy hỏi văn phòng giáo dục đại học của tiểu bang bạn.",
        },
      ],
      faqs: [
        {
          q: "Sinh viên đại học có thể nhận SNAP không?",
          a: "Phần lớn sinh viên toàn thời gian từ 18–49 tuổi không đủ điều kiện nhận SNAP, trừ khi thuộc trường hợp được miễn: làm việc từ 20 giờ/tuần trở lên, tham gia work-study, chăm sóc con nhỏ phụ thuộc, hoặc đang nhận TANF.",
        },
        {
          q: "Pell Grant có chi trả cho cao đẳng cộng đồng không?",
          a: "Có. Pell Grant áp dụng cho các trường cao đẳng cộng đồng được công nhận, chương trình đào tạo nghề và đại học bốn năm. Trợ cấp này dựa trên nhu cầu tài chính, không dựa trên thành tích học tập.",
        },
        {
          q: "Sinh viên quốc tế có thể nhận phúc lợi liên bang không?",
          a: "Phần lớn phúc lợi liên bang yêu cầu quốc tịch Mỹ hoặc tình trạng di dân đủ điều kiện. Sinh viên quốc tế có visa F-1 hoặc J-1 thường không đủ điều kiện nhận SNAP, Medicaid hoặc Pell Grant.",
        },
      ],
    },
    seniors: {
      title: "Phúc lợi cho Người Cao tuổi",
      hero: "Bạn đã làm việc cả đời. Những phúc lợi này là của bạn.",
      description:
        "Người từ 60 tuổi trở lên là một trong những nhóm ít được tiếp cận phúc lợi nhất. Nhiều chương trình có điều kiện rộng hơn hoặc thêm bảo vệ cho người cao tuổi, từ hỗ trợ tiền thuốc đến hỗ trợ thực phẩm.",
      programs: [
        {
          name: "Medicare",
          summary:
            "Bảo hiểm sức khỏe liên bang cho người từ 65 tuổi trở lên, chi trả chi phí bệnh viện, khám chữa bệnh và thuốc.",
          eligibilityHint:
            "Từ 65 tuổi trở lên, hoặc trẻ hơn nhưng có một số khuyết tật hoặc bệnh thận giai đoạn cuối (ESRD).",
        },
        {
          name: "Medicaid",
          summary:
            "Có thể bổ sung cho Medicare, chi trả chăm sóc dài hạn và các chi phí khác.",
          eligibilityHint:
            "Giới hạn thu nhập và tài sản khác nhau theo tiểu bang; nhiều người cao tuổi đủ điều kiện nhận cả hai.",
        },
        {
          name: "SSI",
          summary:
            "Tiền mặt hằng tháng cho người từ 65 tuổi trở lên có thu nhập và tài sản thấp.",
          eligibilityHint:
            "Từ 65 tuổi trở lên, thu nhập và tài sản dưới giới hạn của SSA.",
        },
        {
          name: "SNAP",
          summary:
            "Tiền mua thực phẩm; người cao tuổi có thể đủ điều kiện với mức thu nhập cao hơn.",
          eligibilityHint:
            "Hộ có người cao tuổi hoặc người khuyết tật không phải qua bước kiểm tra tổng thu nhập.",
        },
        {
          name: "LIHEAP",
          summary:
            "Hỗ trợ trả hóa đơn năng lượng. Người cao tuổi là nhóm được ưu tiên.",
          eligibilityHint:
            "Thu nhập bằng hoặc thấp hơn 150% mức chuẩn nghèo liên bang; người cao tuổi được ưu tiên.",
        },
        {
          name: "Trợ cấp Thu nhập Thấp (LIS)",
          summary:
            "Chương trình Extra Help hỗ trợ chi phí thuốc theo toa của Medicare Part D.",
          eligibilityHint:
            "Thu nhập dưới khoảng 150% mức chuẩn nghèo; tài sản thấp.",
        },
        {
          name: "HECM (Thế chấp Ngược)",
          summary:
            "Chương trình được FHA bảo hiểm, cho phép người cao tuổi đổi giá trị căn nhà thành tiền mặt.",
          eligibilityHint:
            "Từ 62 tuổi trở lên, sở hữu nhà hoàn toàn hoặc có phần giá trị nhà lớn.",
        },
      ],
      faqs: [
        {
          q: "Tôi có thể có cả Medicare và Medicaid không?",
          a: "Có. Việc đủ điều kiện cả hai (Medicare + Medicaid) là phổ biến ở người cao tuổi có thu nhập thấp. Medicaid thường chi trả những gì Medicare không chi trả, như chăm sóc dài hạn, nha khoa và thị lực.",
        },
        {
          q: "Giới hạn thu nhập của SSI năm 2026 là bao nhiêu?",
          a: "Năm 2026, mức trả SSI tiêu chuẩn của liên bang là $967/tháng cho một người và $1,450 cho vợ chồng. Giới hạn thu nhập thấp hơn số tiền trả, do cách SSA tính thu nhập. Nhiều tiểu bang trả thêm một khoản bổ sung.",
        },
        {
          q: "Người cao tuổi có được miễn yêu cầu đi làm của SNAP không?",
          a: "Có. Người từ 60 tuổi trở lên được miễn yêu cầu đi làm của SNAP. Hộ có người cao tuổi hoặc người khuyết tật cũng được áp dụng quy định thu nhập có lợi hơn.",
        },
      ],
    },
    "single-parents": {
      title: "Phúc lợi cho Cha Mẹ Đơn thân",
      hero: "Một mình nuôi con là một trong những việc khó nhất. Bạn không nên phải làm việc này mà không có hỗ trợ.",
      description:
        "Cha mẹ đơn thân thường đủ điều kiện nhận nhiều loại phúc lợi nhất: hỗ trợ thực phẩm, chăm sóc sức khỏe cho con, trợ cấp giữ trẻ, hỗ trợ nhà ở và nhiều hơn nữa. Điều khó là biết phải tìm ở đâu.",
      programs: [
        {
          name: "SNAP",
          summary:
            "Tiền mua thực phẩm hằng tháng cho các gia đình có thu nhập thấp.",
          eligibilityHint:
            "Tổng thu nhập bằng hoặc thấp hơn 130% FPL; gia đình đông người nhận nhiều hơn.",
        },
        {
          name: "CHIP",
          summary:
            "Bảo hiểm sức khỏe chi phí thấp cho trẻ em trong gia đình có thu nhập quá cao để nhận Medicaid.",
          eligibilityHint:
            "Trẻ em dưới 19 tuổi trong gia đình có thu nhập cao hơn giới hạn của Medicaid.",
        },
        {
          name: "WIC",
          summary:
            "Hỗ trợ dinh dưỡng cho phụ nữ mang thai, người mẹ mới sinh con và trẻ em dưới 5 tuổi.",
          eligibilityHint:
            "Thu nhập bằng hoặc thấp hơn 185% FPL; phải có yếu tố nguy cơ về dinh dưỡng.",
        },
        {
          name: "TANF",
          summary: "Tiền mặt và các dịch vụ hỗ trợ cho gia đình có con.",
          eligibilityHint:
            "Gia đình có con dưới 18 tuổi; yêu cầu về thu nhập và việc làm khác nhau theo tiểu bang.",
        },
        {
          name: "CCDF (Trợ cấp Giữ trẻ)",
          summary:
            "Trợ cấp giữ trẻ của liên bang giúp các gia đình thu nhập thấp trả được tiền giữ trẻ.",
          eligibilityHint:
            "Cha mẹ đang đi làm hoặc đi học; mức thu nhập khác nhau theo tiểu bang.",
        },
        {
          name: "EITC",
          summary:
            "Tín thuế hoàn lại, tối đa $7,830 cho gia đình có từ ba con trở lên.",
          eligibilityHint:
            "Phải có thu nhập từ làm việc và đáp ứng giới hạn AGI (tổng thu nhập điều chỉnh); cao hơn nhiều nếu có con.",
        },
        {
          name: "Section 8 (HCV)",
          summary: "Phiếu thuê nhà giúp tiền nhà không vượt quá 30% thu nhập.",
          eligibilityHint:
            "Thu nhập bằng hoặc thấp hơn 50% mức trung bình của khu vực; gia đình có con được ưu tiên.",
        },
      ],
      faqs: [
        {
          q: "Tôi có thể nhận SNAP và TANF cùng lúc không?",
          a: "Có. SNAP và TANF là hai chương trình riêng. Nhiều gia đình cha mẹ đơn thân nhận cả hai cùng lúc. Ở một số tiểu bang, việc nhận TANF có thể giúp bạn tự động đủ điều kiện nhận SNAP.",
        },
        {
          q: "WIC có phải chỉ dành cho phụ nữ mang thai không?",
          a: "Không. WIC phục vụ phụ nữ mang thai, người mẹ đang cho con bú, phụ nữ sau sinh đến 6 tháng, và trẻ em đến 5 tuổi. Con bạn có thể đủ điều kiện ngay cả khi bạn không đủ điều kiện.",
        },
        {
          q: "EITC tối đa cho cha mẹ đơn thân có một con là bao nhiêu?",
          a: "Với năm thuế 2025, EITC tối đa cho người khai thuế độc thân có một con đủ điều kiện là $4,328. Với hai con là $7,152, và với ba con trở lên là $7,830.",
        },
      ],
    },
    "gig-workers": {
      title: "Phúc lợi cho Người Làm việc Tự do (Gig)",
      hero: "Tự làm chủ không có nghĩa là bạn phải tự lo một mình.",
      description:
        "Người làm việc tự do, tài xế chở khách, người giao hàng và nhà thầu độc lập thường bị bỏ sót. Nhưng nhiều chương trình của liên bang và tiểu bang có tính thu nhập tự làm chủ và có hỗ trợ thực sự.",
      programs: [
        {
          name: "Bảo hiểm Marketplace (ACA)",
          summary:
            "Bảo hiểm sức khỏe có trợ giá theo thu nhập cho người không có bảo hiểm từ chỗ làm.",
          eligibilityHint:
            "Không có bảo hiểm từ chỗ làm; thu nhập trong khoảng 100–400% FPL.",
        },
        {
          name: "SNAP",
          summary:
            "Thu nhập tự làm chủ được tính. Việc tính theo thu nhập ròng thường giúp nhiều người đủ điều kiện hơn.",
          eligibilityHint:
            "Dùng thu nhập ròng từ tự làm chủ; các khoản khấu trừ giảm thu nhập được tính.",
        },
        {
          name: "EITC",
          summary:
            "Tín thuế cho người lao động thu nhập thấp. Thu nhập từ việc gig được tính là thu nhập từ làm việc.",
          eligibilityHint:
            "Thu nhập tự làm chủ được tính; phải nộp Schedule SE.",
        },
        {
          name: "Medicaid",
          summary:
            "Bảo hiểm miễn phí hoặc chi phí thấp nếu thu nhập của bạn dưới mức của tiểu bang.",
          eligibilityHint:
            "Thu nhập hằng năm dưới khoảng 138% FPL ở các tiểu bang đã mở rộng Medicaid.",
        },
        {
          name: "LIHEAP",
          summary:
            "Hỗ trợ trả hóa đơn năng lượng, nhất là vào các mùa cần sưởi ấm hoặc làm mát nhiều.",
          eligibilityHint:
            "Thu nhập bằng hoặc thấp hơn 150% FPL; thu nhập không đều được tính trung bình theo thời gian.",
        },
        {
          name: "SBIR / STTR",
          summary:
            "Trợ cấp R&D của liên bang cho doanh nghiệp nhỏ phát triển công nghệ đổi mới.",
          eligibilityHint:
            "Doanh nghiệp nhỏ do người Mỹ sở hữu; phải có dưới 500 nhân viên.",
        },
      ],
      faqs: [
        {
          q: "Thu nhập từ việc gig có được tính cho SNAP không?",
          a: "Có. SNAP dùng thu nhập ròng từ tự làm chủ, tức là tổng tiền kiếm được trừ đi các chi phí kinh doanh được phép. Cách tính này thường cho ra thu nhập được tính thấp hơn so với người làm công ăn lương (W-2) có cùng doanh thu.",
        },
        {
          q: "Tôi có thể nhận trợ cấp thất nghiệp nếu làm việc gig không?",
          a: "Bảo hiểm thất nghiệp (UI) tiêu chuẩn không chi trả cho nhà thầu độc lập. Tuy nhiên, chương trình Hỗ trợ Thất nghiệp Đại dịch (PUA) đã chi trả trong thời gian COVID-19. Một số tiểu bang đang xem xét chương trình UI cho người làm việc gig. Hãy hỏi sở lao động của tiểu bang bạn về quy định hiện hành.",
        },
        {
          q: "Người tự làm chủ có thể khấu trừ phí bảo hiểm sức khỏe không?",
          a: "Có. Người tự làm chủ có thể khấu trừ 100% phí bảo hiểm sức khỏe cho bản thân, vợ hoặc chồng, và người phụ thuộc khỏi thu nhập chịu thuế liên bang, ngay cả khi bạn không khai khấu trừ từng khoản.",
        },
      ],
    },
    immigrants: {
      title: "Phúc lợi cho Người Nhập cư",
      hero: "Làm quen với một đất nước mới đã đủ khó. Biết các lựa chọn của mình không nên khó như vậy.",
      description:
        "Điều kiện nhận phúc lợi liên bang tùy vào tình trạng di trú, thời gian cư trú và từng chương trình cụ thể. Nhiều người nhập cư và con cái sinh ra tại Mỹ của họ đủ điều kiện nhận hỗ trợ đáng kể.",
      programs: [
        {
          name: "SNAP",
          summary:
            "Thường trú nhân hợp pháp có thể đủ điều kiện sau 5 năm; một số trường hợp ngoại lệ được nhận sớm hơn.",
          eligibilityHint:
            "Cần có tình trạng di dân đủ điều kiện; phần lớn người lớn phải chờ 5 năm.",
        },
        {
          name: "Medicaid / CHIP",
          summary:
            "Medicaid Khẩn cấp có cho mọi người, bất kể tình trạng di trú; CHIP khác nhau theo tiểu bang.",
          eligibilityHint:
            "Thường trú nhân (LPR) đủ điều kiện sau 5 năm; ở nhiều tiểu bang, trẻ em thường đủ điều kiện ngay.",
        },
        {
          name: "WIC",
          summary:
            "WIC không có thời gian chờ 5 năm đối với phần lớn các tình trạng di trú.",
          eligibilityHint:
            "Mọi người nhập cư hợp pháp đều đủ điều kiện, bất kể đã sống ở Mỹ bao lâu.",
        },
        {
          name: "EITC",
          summary:
            "Dành cho cư dân hợp pháp có số An sinh Xã hội và có thu nhập từ làm việc.",
          eligibilityHint:
            "Phải có SSN hợp lệ và có thu nhập từ làm việc đủ điều kiện.",
        },
        {
          name: "ACA Marketplace",
          summary:
            "Bảo hiểm sức khỏe có trợ giá; người có DACA đủ điều kiện ở hầu hết các tiểu bang.",
          eligibilityHint:
            "Cần có tình trạng hiện diện hợp pháp; ở hầu hết các tiểu bang, DACA được xem là hiện diện hợp pháp.",
        },
        {
          name: "LIHEAP",
          summary: "Hỗ trợ năng lượng dành cho nhiều người nhập cư hợp pháp.",
          eligibilityHint:
            "Có tình trạng nhập cư hợp pháp; áp dụng giới hạn thu nhập và tài sản.",
        },
      ],
      faqs: [
        {
          q: "Nộp đơn xin phúc lợi có ảnh hưởng đến hồ sơ thẻ xanh của tôi không?",
          a: "Quy định 'gánh nặng xã hội' (public charge) áp dụng cho một số phúc lợi liên bang. Từ năm 2023, SNAP, Medicaid, CHIP và phiếu nhà ở KHÔNG được xem xét trong hầu hết các quyết định di trú. TANF và SSI vẫn có thể được xem xét. Nếu bạn đang làm hồ sơ thẻ xanh, hãy luôn hỏi ý kiến luật sư di trú trước khi nộp đơn.",
        },
        {
          q: "Người nhập cư không có giấy tờ có thể nhận phúc lợi nào không?",
          a: "Medicaid Khẩn cấp có cho bất kỳ ai gặp tình trạng y tế khẩn cấp, bất kể tình trạng di trú. Con sinh ra tại Mỹ của cha mẹ không có giấy tờ đủ điều kiện nhận đầy đủ phúc lợi. Nhiều chương trình của tiểu bang và địa phương không yêu cầu về tình trạng di trú.",
        },
        {
          q: "'Di dân đủ điều kiện' (qualified alien) trong việc xét phúc lợi là gì?",
          a: "Di dân đủ điều kiện gồm thường trú nhân hợp pháp (người có thẻ xanh), người tị nạn, người được cấp quy chế tị nạn chính trị (asylee), người được tạm hoãn trục xuất, người nhập cảnh từ Cuba/Haiti, và một số nạn nhân bạo lực gia đình. Định nghĩa chính xác khác nhau theo chương trình.",
        },
      ],
    },
    "recently-unemployed": {
      title: "Phúc lợi cho Người Mới Mất việc",
      hero: "Mất việc là điều khó khăn. Tìm sự hỗ trợ không nên khó như vậy.",
      description:
        "Khi mất việc, bạn có thể đủ điều kiện nhận các chương trình mà trước đây bạn không đủ điều kiện. Hành động nhanh là điều quan trọng: nhiều phúc lợi có ngay từ ngày đầu, và một số có thời hạn nộp đơn ngắn.",
      programs: [
        {
          name: "Bảo hiểm Thất nghiệp",
          summary:
            "Tiền mặt hằng tuần dựa trên tiền lương trước đây trong lúc bạn tìm việc.",
          eligibilityHint:
            "Phải mất việc không do lỗi của bạn; cần có thu nhập trước đó.",
        },
        {
          name: "Medicaid / ACA Marketplace",
          summary:
            "Mất việc là một sự kiện đủ điều kiện trong đời sống. Bạn có 60 ngày để ghi danh.",
          eligibilityHint:
            "Mất bảo hiểm từ chỗ làm sẽ mở ra một thời gian ghi danh đặc biệt.",
        },
        {
          name: "SNAP",
          summary:
            "Khi thu nhập giảm do mất việc, nhiều hộ gia đình đủ điều kiện ngay.",
          eligibilityHint:
            "Hãy nộp đơn ngay khi thu nhập giảm; thời gian xử lý tối đa 30 ngày.",
        },
        {
          name: "LIHEAP",
          summary:
            "Hỗ trợ hóa đơn năng lượng để tránh bị cắt điện, gas trong thời gian thu nhập bị gián đoạn.",
          eligibilityHint:
            "Thu nhập giảm thường giúp bạn đủ điều kiện; có hỗ trợ khẩn cấp khi sắp bị cắt.",
        },
        {
          name: "COBRA",
          summary:
            "Tiếp tục giữ bảo hiểm sức khỏe từ chỗ làm cũ trong tối đa 18 tháng.",
          eligibilityHint:
            "Áp dụng nếu bạn đã có bảo hiểm từ chỗ làm; thường đắt.",
        },
        {
          name: "EITC",
          summary:
            "Nếu bạn đã làm việc một phần của năm, bạn vẫn có thể đủ điều kiện khi khai thuế.",
          eligibilityHint:
            "Dựa trên cả năm thuế; thu nhập một phần năm vẫn có thể đủ điều kiện.",
        },
        {
          name: "Đào tạo WIOA",
          summary:
            "Đào tạo nghề, giúp viết hồ sơ xin việc và dịch vụ nghề nghiệp do liên bang tài trợ.",
          eligibilityHint:
            "Có tại các American Job Center (Trung tâm Việc làm); cần xác minh thu nhập.",
        },
      ],
      faqs: [
        {
          q: "Sau khi mất việc, bao lâu thì tôi nhận được SNAP?",
          a: "Bạn có thể nộp đơn ngay trong ngày mất việc. Thời gian xử lý thông thường là tối đa 30 ngày, nhưng SNAP Khẩn (Expedited SNAP) có thể được cấp trong vòng 7 ngày nếu thu nhập và tài sản của bạn rất thấp.",
        },
        {
          q: "Tiền bảo hiểm thất nghiệp có phải đóng thuế không?",
          a: "Có, tiền trợ cấp thất nghiệp được xem là thu nhập chịu thuế liên bang. Bạn có thể chọn khấu trừ thuế liên bang từ các khoản tiền nhận được để không bị bất ngờ với hóa đơn thuế khi khai thuế.",
        },
        {
          q: "Nếu tôi bị sa thải, tôi có còn được nhận trợ cấp thất nghiệp không?",
          a: "Điều này tùy vào lý do. Nếu bạn bị sa thải vì vi phạm kỷ luật, bạn có thể không đủ điều kiện. Nếu bạn bị cho nghỉ việc hoặc bị sa thải vì lý do hiệu suất làm việc (không phải cố ý vi phạm), bạn thường đủ điều kiện. Mỗi tiểu bang tự đưa ra quyết định.",
        },
      ],
    },
    "people-with-disabilities": {
      title: "Phúc lợi cho Người Khuyết tật",
      hero: "Các hệ thống hỗ trợ đều có sẵn. Bạn không nên phải tốn nhiều thời gian như làm một công việc toàn thời gian chỉ để tìm chúng.",
      description:
        "Người sống với khuyết tật, dù về thể chất, nhận thức hay loại khác, là một trong những nhóm ít được tiếp cận phúc lợi nhất. Nhiều chương trình có phần chồng lên nhau có thể hỗ trợ thu nhập, chăm sóc sức khỏe, nhà ở và nhiều hơn nữa.",
      programs: [
        {
          name: "SSI",
          summary:
            "Tiền mặt hằng tháng cho người có thu nhập thấp và có khuyết tật đủ điều kiện.",
          eligibilityHint:
            "Phải đáp ứng định nghĩa khuyết tật của SSA; áp dụng giới hạn thu nhập và tài sản.",
        },
        {
          name: "SSDI",
          summary:
            "Thu nhập khuyết tật dựa trên quá trình làm việc và số điểm An sinh Xã hội của bạn.",
          eligibilityHint:
            "Phải làm việc đủ số quý; khuyết tật phải khiến bạn không thể làm việc đáng kể.",
        },
        {
          name: "Medicaid",
          summary: "Bảo hiểm sức khỏe miễn phí, thường đi kèm tự động với SSI.",
          eligibilityHint:
            "Người nhận SSI thường được ghi danh tự động; người khác nộp đơn riêng.",
        },
        {
          name: "Medicare",
          summary:
            "Có sau 24 tháng nhận SSDI, chi trả bệnh viện, khám chữa bệnh và thuốc theo toa.",
          eligibilityHint: "Được ghi danh tự động sau 24 tháng nhận SSDI.",
        },
        {
          name: "Section 8 (HCV)",
          summary:
            "Hỗ trợ tiền thuê nhà; người khuyết tật được ưu tiên trong nhiều danh sách chờ.",
          eligibilityHint:
            "Thường có ưu tiên cho người khuyết tật; thu nhập bằng hoặc thấp hơn 50% AMI.",
        },
        {
          name: "SNAP",
          summary:
            "Hộ có người khuyết tật được miễn nhiều quy định SNAP thông thường và yêu cầu đi làm.",
          eligibilityHint:
            "Hộ có người khuyết tật không phải qua bước kiểm tra tổng thu nhập; dùng thu nhập ròng.",
        },
        {
          name: "Tài khoản ABLE",
          summary:
            "Tài khoản tiết kiệm có ưu đãi thuế, không ảnh hưởng đến điều kiện nhận SSI hoặc Medicaid.",
          eligibilityHint:
            "Khuyết tật bắt đầu trước 26 tuổi; áp dụng giới hạn đóng góp hằng năm.",
        },
      ],
      faqs: [
        {
          q: "SSI và SSDI khác nhau thế nào?",
          a: "SSI (Thu nhập An sinh Bổ sung) dựa trên nhu cầu, dành cho người có thu nhập và tài sản thấp, bất kể quá trình làm việc. SSDI (Bảo hiểm Khuyết tật An sinh Xã hội) dựa trên quá trình làm việc và số thuế An sinh Xã hội bạn đã đóng. Bạn có thể nhận cả hai nếu đủ điều kiện.",
        },
        {
          q: "Mất bao lâu để được chấp thuận phúc lợi khuyết tật?",
          a: "Quyết định ban đầu thường mất 3–6 tháng. Việc bị từ chối là phổ biến, và kháng nghị có thể mất 1–2 năm. Làm việc với luật sư về khuyết tật (thường chỉ nhận tiền khi bạn thắng) thường là đáng làm.",
        },
        {
          q: "Nhận phúc lợi khuyết tật có ảnh hưởng đến người trong gia đình tôi không?",
          a: "SSDI có phúc lợi phụ cho vợ hoặc chồng và con cái của bạn. SSI không áp dụng cho người trong gia đình. Việc bạn nhận phúc lợi khuyết tật không làm vợ hoặc chồng hay con cái của bạn mất điều kiện nhận phúc lợi riêng của họ.",
        },
      ],
    },
  },
};
