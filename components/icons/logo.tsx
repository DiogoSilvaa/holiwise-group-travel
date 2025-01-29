import * as React from "react";
import { SVGProps } from "react";
export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={117}
    height={34}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <mask
        id="b"
        width={117}
        height={34}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskMode: "luminance",
        }}
      >
        <path fill="#fff" d="M117 0H0v33.507h117V0Z" />
      </mask>
      <g mask="url(#b)">
        <path
          fill="#000"
          d="M40.853 9.08c0-.386.186-.576.553-.576h.484c.37 0 .555.193.555.576v6.807h9.415V9.08c0-.386.185-.576.554-.576h.461c.383 0 .576.193.576.576v15.066c0 .385-.193.575-.576.575h-.46c-.37 0-.555-.192-.555-.575v-6.83h-9.415v6.83c0 .385-.186.575-.555.575h-.484c-.37 0-.553-.192-.553-.575V9.08Zm13.954 9.786a5.926 5.926 0 0 1 1.765-4.269 6.118 6.118 0 0 1 1.937-1.28 6.13 6.13 0 0 1 2.412-.473 6.14 6.14 0 0 1 2.412.472 6.252 6.252 0 0 1 1.948 1.281 5.882 5.882 0 0 1 1.778 4.27c0 .846-.158 1.664-.473 2.411a6.038 6.038 0 0 1-3.253 3.254 6.081 6.081 0 0 1-2.389.472 6.198 6.198 0 0 1-2.412-.473 6.014 6.014 0 0 1-1.948-1.304 6.064 6.064 0 0 1-1.305-1.949 6.13 6.13 0 0 1-.472-2.412Zm1.615 0c0 .659.115 1.274.345 1.848.23.574.55 1.072.957 1.493.407.42.889.754 1.443.999a4.341 4.341 0 0 0 1.777.366 4.28 4.28 0 0 0 1.766-.366 4.607 4.607 0 0 0 1.431-1c.407-.42.727-.918.957-1.492a4.91 4.91 0 0 0 .346-1.848c0-.658-.115-1.243-.346-1.803a4.5 4.5 0 0 0-.957-1.457 4.485 4.485 0 0 0-1.431-.976 4.38 4.38 0 0 0-1.766-.355 4.509 4.509 0 0 0-3.22 1.33 4.5 4.5 0 0 0-.957 1.458 4.684 4.684 0 0 0-.345 1.803ZM68.418 9.08c0-.386.186-.576.555-.576h.44c.383 0 .575.193.575.576V21.7c0 1.03.4 1.592 1.2 1.686.321.047.483.217.483.508v.346c0 .385-.2.576-.6.576-.829 0-1.48-.25-1.948-.75-.47-.499-.703-1.197-.703-2.088V9.08h-.002Zm4.477 4.617c0-.385.193-.576.576-.576h.438c.369 0 .554.193.554.576v10.451c0 .386-.185.576-.554.576h-.438c-.385 0-.576-.192-.576-.576V13.697Zm3.503.071c-.047-.43.153-.647.6-.647h.416c.338 0 .515.162.531.484l1.107 8.167c.014.138.024.284.024.44 0 .154.007.29.023.415 0 .155.007.301.024.44h.047c.077-.139.146-.285.207-.44.06-.122.127-.26.195-.416.07-.152.14-.3.218-.44l4.293-8.145a.77.77 0 0 1 .738-.46h.576c.338 0 .515.153.531.46l1.13 8.146c.015.138.027.284.036.44.007.152.019.29.035.415.017.155.024.301.024.44h.047c.077-.139.146-.285.207-.44.06-.122.127-.256.197-.404.068-.146.141-.296.219-.449l4.245-8.166c.153-.322.4-.485.738-.485h.508c.214 0 .353.06.416.174.061.116.038.273-.07.473l-5.583 10.475c-.153.322-.4.484-.738.484h-.715c-.355 0-.538-.162-.552-.484l-1.178-7.777c-.03-.138-.05-.28-.059-.427a4.937 4.937 0 0 0-.035-.405 3.518 3.518 0 0 1-.024-.416h-.047c-.06.139-.122.278-.183.416-.061.125-.132.259-.207.405-.078.145-.153.289-.23.427l-4.154 7.777c-.153.322-.407.484-.762.484h-.714c-.355 0-.539-.162-.555-.484L76.4 13.77l-.003-.002Zm21.369 9.898c-.292-.2-.322-.461-.092-.785l.186-.23c.185-.262.446-.292.785-.093.43.339.914.6 1.453.786a4.98 4.98 0 0 0 1.615.277c.707 0 1.276-.17 1.706-.508.43-.338.647-.792.647-1.36 0-.431-.153-.781-.461-1.052a4.544 4.544 0 0 0-1.154-.714 21.803 21.803 0 0 0-1.488-.6 8.637 8.637 0 0 1-1.488-.703 4.122 4.122 0 0 1-1.154-1.015c-.309-.4-.461-.924-.461-1.568 0-.477.091-.914.277-1.314.186-.4.45-.745.797-1.039a3.622 3.622 0 0 1 1.246-.67 5.394 5.394 0 0 1 1.627-.23c.599 0 1.154.084 1.706.253.555.17 1.046.4 1.476.692.292.2.346.453.163.761l-.163.254c-.185.322-.446.376-.785.162a4.617 4.617 0 0 0-2.491-.738c-.724 0-1.284.162-1.686.485-.4.324-.6.761-.6 1.316 0 .447.153.808.461 1.084.308.277.689.52 1.143.726.454.207.95.404 1.488.588a7.73 7.73 0 0 1 1.488.69c.454.278.834.621 1.142 1.028.308.407.461.933.461 1.58 0 .491-.096.938-.289 1.337a2.98 2.98 0 0 1-.809 1.027 3.864 3.864 0 0 1-1.246.67 4.94 4.94 0 0 1-1.579.243c-.738 0-1.453-.12-2.147-.358a5.472 5.472 0 0 1-1.777-.98m8.669-4.734c0-.89.139-1.71.416-2.456a5.623 5.623 0 0 1 1.178-1.925 5.394 5.394 0 0 1 1.81-1.258c.7-.3 1.474-.451 2.318-.451.738 0 1.408.127 2.007.38.6.254 1.112.623 1.535 1.108.423.484.745 1.07.969 1.753.223.684.333 1.45.333 2.297 0 .17-.058.308-.173.416a.604.604 0 0 1-.428.162h-8.352c.014.69.134 1.317.357 1.883a4.24 4.24 0 0 0 .936 1.458c.399.406.872.719 1.419.94a4.73 4.73 0 0 0 1.789.334 4.304 4.304 0 0 0 1.592-.266 5.122 5.122 0 0 0 1.452-.797c.322-.2.576-.152.762.139l.183.277c.17.308.116.562-.162.764a6.513 6.513 0 0 1-1.845.962 6.285 6.285 0 0 1-2.031.352c-.877 0-1.688-.15-2.433-.449a5.728 5.728 0 0 1-1.928-1.257 5.7 5.7 0 0 1-1.257-1.928 6.435 6.435 0 0 1-.449-2.433m8.975-1.154c-.047-1.107-.365-1.991-.957-2.654-.592-.66-1.373-.992-2.341-.992-1.046 0-1.93.331-2.654.992-.724.66-1.169 1.547-1.338 2.654h7.292-.002ZM72.738 9.551c0-.524.412-.95.962-.95s.95.426.95.95-.4.962-.95.962a.946.946 0 0 1-.962-.962Zm21.768 4.146c0-.385.193-.576.576-.576h.437c.37 0 .555.193.555.576v10.451c0 .386-.186.576-.555.576h-.437c-.386 0-.576-.192-.576-.576V13.697Zm-.172-4.146c0-.524.411-.95.961-.95s.95.426.95.95-.4.962-.95.962a.946.946 0 0 1-.961-.962Z"
        />
        <path
          fill="#A2DFFF"
          d="M16.754 0C7.5 0 0 7.501 0 16.754c0 9.252 7.501 16.753 16.754 16.753 9.252 0 16.753-7.501 16.753-16.753C33.507 7.5 26.006 0 16.754 0ZM20.1 16.991c-2.647 1.356-5.778 1.523-7.165 1.523-.061 0-.117 0-.172-.002v5.924c0 .689-.336 1.032-1.006 1.032h-1.13c-.67 0-1.007-.343-1.007-1.032V9.069c0-.686.337-1.03 1.007-1.03h1.13c.67 0 1.006.346 1.006 1.035v6.732c.598.01 1.843-.016 3.223-.277 1.3-.247 2.941-.748 4.114-1.765v3.227Zm3.782 7.445c0 .689-.336 1.032-1.006 1.032H21.75c-.672 0-1.009-.343-1.009-1.032V9.069c0-.686.337-1.03 1.009-1.03h1.128c.67 0 1.006.346 1.006 1.035v15.362Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h117v33.507H0z" />
      </clipPath>
    </defs>
  </svg>
);
